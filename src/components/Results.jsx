const Results = ({ score, total, name, onStartOver }) => {

    return (
        <div >
            <h1 className="mt-3 mb-5">Quiz Complete!</h1>
            <h5 className="mb-4">Great job {name}, you scored {score} out of {total}!</h5>
            <p>Want to test your knowledge some more? Click the button below to start over!</p>
            <button onClick={onStartOver} className='btn btn-dark btn-sm mt-5'>Start Over</button>
        </div>
    );
}

export default Results;

