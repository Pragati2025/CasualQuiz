import React from 'react';

const ReportPage = ({ answers, questions }) => {
  // Calculate the score by comparing user's answers with correct answers
  const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  return (
    <div className="report-page">
      <h3>Quiz Completed</h3>
      <p>Your Score: {score}/{questions.length}</p>
      <p>Thank you for taking the quiz!</p>
      
      {/* Report Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.question}</td>
              <td>{answers[index] || "No Answer"}</td>
              <td>{question.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
