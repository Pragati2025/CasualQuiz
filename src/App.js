import React, { useState, useEffect } from 'react';
import Header from './components/Header'; // Correct relative path

import StartPage from './components/StartPage';
import QuestionPage from './components/QuestionPage';
import ReportPage from './components/ReportPage';
import Timer from './components/Timer';
import './styles/App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timerExpired, setTimerExpired] = useState(false);
  const [emailError, setEmailError] = useState(''); // For email validation error message
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(''); // For error message if API fetch fails

  // Fetch quiz questions from the external API
  useEffect(() => {
    if (quizStarted) {
      setLoading(true); // Start loading when quiz starts
      setError(''); // Clear previous error
      fetch('https://opentdb.com/api.php?amount=15&type=multiple')
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the raw API data
          const fetchedQuestions = data.results.map((question) => {
            // Concatenate the correct answer and incorrect answers
            const allAnswers = [...question.incorrect_answers, question.correct_answer];

            // Shuffle the answers to randomize their order
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

            return {
              question: question.question,
              options: shuffledAnswers, // Randomized options
              correctAnswer: question.correct_answer,
            };
          });
          setQuestions(fetchedQuestions);
          setLoading(false); // Stop loading once the questions are fetched
        })
        .catch((error) => {
          console.log('Error fetching questions:', error);
          setError('Failed to load questions. Please try again later.');
          setLoading(false); // Stop loading in case of an error
        });
    }
  }, [quizStarted]);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleStartQuiz = () => {
    if (validateEmail(email)) {
      setEmailError('');
      setQuizStarted(true);
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setTimerExpired(true);
  };

  return (
    <div className="app">
      <Header />
      {quizStarted ? (
        <>
          {loading ? (
            <p>Loading questions...</p>
          ) : error ? (
            <p>{error}</p> // Display error message if API fetch fails
          ) : (
            <>
              {questions.length > 0 ? (
                <>
                  <Timer onExpire={handleSubmitQuiz} timeLimit={30 * 60} />
                  <QuestionPage
                    question={questions[currentQuestion].question} // Pass the current question
                    options={questions[currentQuestion].options} // Pass the options
                    onAnswer={handleAnswer} // Pass the answer handler
                    currentQuestion={currentQuestion} // Current question index
                    setCurrentQuestion={setCurrentQuestion} // Function to move to next question
                    questionsLength={questions.length} // Total number of questions
                  />
                  <button className="submit-button" onClick={handleSubmitQuiz}>
                    Submit Test
                  </button>
                </>
              ) : (
                <p>No questions available</p>
              )}
            </>
          )}
        </>
      ) : timerExpired ? (
        <ReportPage answers={answers} questions={questions} />
      ) : (
        <StartPage
          email={email}
          setEmail={setEmail}
          onStartQuiz={handleStartQuiz}
          emailError={emailError}
        />
      )}
    </div>
  );
};

export default App;
