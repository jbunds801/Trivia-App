import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Results from './Results';

//converts symbols from HTML entities into their true characters
const decodeHTML = (str) => {
    const text = document.createElement('textarea');
    text.innerHTML = str;
    return text.value;
};

const Questions = ({ category, difficulty, name, onStartOver }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);

    const getCatIdByName = async (name) => {
        try {
            const results = await fetch('https://opentdb.com/api_category.php')
            const data = await results.json();
            const categoryData = data.trivia_categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
            return categoryData ? categoryData.id : null;
        } catch (error) {
            console.error("Error fetching category ID:", error);
            return null;
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            const cat = await getCatIdByName(category);
            if (!cat) return;

            const results = await fetch(`https://opentdb.com/api.php?amount=5&category=${cat}&difficulty=${difficulty}&type=multiple`);
            if (!results.ok) {
                return
            }

            const data = await results.json();

            //returns multiple choice answers in random order
            const formatted = data.results.map((q) => {
                const answers = [...q.incorrect_answers];
                const randomIndex = Math.floor(Math.random() * 4);
                answers.splice(randomIndex, 0, q.correct_answer);
                return {
                    ...q,
                    allAnswers: answers,
                };
            });

            setQuestions(formatted);
        };

        fetchQuestions();
    }, [category, difficulty]);

    const handleSubmit = () => {
        const isAnswerCorrect =
            selectedAnswer === questions[currentIndex].correct_answer;
        setIsCorrect(isAnswerCorrect);
        setShowFeedback(true);
        if (isAnswerCorrect) setScore(score + 1);
    };

    const handleNext = () => {
        setSelectedAnswer('');
        setShowFeedback(false);
        setCurrentIndex(currentIndex + 1);
    };

    if (questions.length === 0)
        return <p>Loading questions...</p>

    if (currentIndex >= questions.length) {
        return (
            <Results
                score={score}
                total={questions.length}
                name={name}
                onStartOver={onStartOver}
            />
        );
    }

    const current = questions[currentIndex];

    return (
        <div>
            <h1>{decodeHTML(current.question)}</h1>
            {current.allAnswers.map((ans, idx) => (
                <div className='mt-5 mb-3' key={idx}>
                    <label className='form-label'>
                        <input className='mx-2'
                            type="radio"
                            name="answer"
                            value={ans}
                            checked={selectedAnswer === ans}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            disabled={showFeedback} //doesn't let the user click on another radio so they can't change their answer
                        />
                        {decodeHTML(ans)}
                    </label>
                </div>
            ))}

            {!showFeedback && (
                <button className='btn btn-dark btn-sm mt-5' onClick={handleSubmit} disabled={!selectedAnswer}>
                    Submit Answer
                </button>
            )}

            {showFeedback && (
                <div>
                    {isCorrect ? (
                        <h5 style={{ color: 'green' }}>
                            That's right, {name}!
                        </h5>
                    ) : (
                        <h5 style={{ color: 'red' }}>
                            Not quite, {name}. The correct answer was:{' '}
                            {decodeHTML(current.correct_answer)}
                        </h5>
                    )}
                    <button onClick={handleNext} className='btn btn-dark btn-sm mt-3'>Next Question</button>
                </div>
            )}
        </div>
    );
};


export default Questions;