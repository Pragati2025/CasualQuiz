// src/components/OverviewPanel.js
import React from 'react';

const OverviewPanel = ({ questions, answers, setCurrentQuestion }) => {
  return (
    <div className="overview-panel">
      <h3>Overview</h3>
      {questions.map((question, index) => (
        <div key={index} className="question-status">
          <span>{index + 1}. {question.question}</span>
          <span 
            className={answers[index] ? 'attempted' : 'not-attempted'}>
            {answers[index] ? 'Attempted' : 'Not Attempted'}
          </span>
          <button onClick={() => setCurrentQuestion(index)}>
            Go to Question {index + 1}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OverviewPanel;
