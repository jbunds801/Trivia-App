import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './Questions.jsx';

const HomePage = () => {

    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [start, setStart] = useState(false);
    const [name, setName] = useState('');

    const handleStartOver = () => {
        setCategory('');
        setDifficulty('');
        setStart(false);
        setName('');
    };

    return (
        <div>
            {!start && (
                <div>
                    <div className='mb-5'>
                        <h1>Welcome to Trivia Time!</h1>
                    </div>
                    <h5 >Enter your name</h5>
                    <label className='form-label'
                        htmlFor="name"></label>
                    <div className="row justify-content-center">
                        <input className="form-control text-center w-50"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mt-5'>
                        <h5>Please select from the dropdowns below and
                            click the button to get started!</h5>
                    </div>
                    <div className='mt-5 mb-3'>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="General Knowledge">General Knowledge</option>
                            <option value="Science & Nature">Science & Nature</option>
                            <option value="Animals">Animals</option>
                            <option value="Mythology">Mythology</option>
                        </select>
                    </div>
                    <br />
                    <div className='mb-3'>
                        <select onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="">Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <br />
                    <button className='btn btn-dark btn-sm' onClick={() => setStart(true)}>Go!</button>
                </div>
            )}

            {start && category && difficulty && (
                <div className='questions-card'>
                    <Questions category={category} difficulty={difficulty} name={name}
                        onStartOver={handleStartOver} />
                </div>
            )}
        </div>
    )
}

export default HomePage;