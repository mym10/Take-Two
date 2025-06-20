import React, { useState, useEffect } from 'react';
import questionsData from '../static/questionsData.json';
import Confetti from 'react-confetti';

const QuizComponent = ({ open, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = questionsData;  

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizFinished(true); 
        setIsQuizEnded(true);
      }
    } else {
      setIsQuizEnded(true); 
    }
  };

  const handleQuizClose = () => {
    onClose();
  };

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizEnded(false);
    setQuizFinished(false);
  }, [open]);

  return (
    <div className={`quiz-container ${open ? 'open' : ''}`}>
      <div className="quiz-dialog">
        {!isQuizEnded ? (
          <div className="quiz">
            <h2>{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button className='login-button quiz-button' key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="quiz-result">
            {quizFinished ? (
                <div>
                    <h2>Your Final Score: {score}/{questions.length}</h2>
                    <Confetti width={window.innerWidth} height={window.innerHeight} />
                </div>
            ) : (
              <h2>Your Score: {score}/{questions.length}</h2>
            )}
            <button className='login-button quiz-button' onClick={handleQuizClose}>Close Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
