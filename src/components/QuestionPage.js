import React, { useState, useEffect } from "react";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]); // Store the questions from the API
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track which questions have been answered
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the index of the current question
  const [loading, setLoading] = useState(true); // Loading state to indicate when the data is being fetched
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer for the current question
  const [error, setError] = useState(null); // Error state to capture any errors

  useEffect(() => {
    // Fetch the questions from your API
    fetch("https://opentdb.com/api.php?amount=15&type=multiple") // Replace with your actual API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response Data:", data); // Log the API response to check the structure

        if (!data.results || data.results.length === 0) {
          setError("No questions available.");
          setLoading(false);
          return;
        }

        // Format the questions and options
        const formattedQuestions = data.results.map((questionData) => {
          const options = [
            questionData.correct_answer,
            ...questionData.incorrect_answers,
          ];

          // Shuffle options randomly (optional, if needed)
          options.sort(() => Math.random() - 0.5);

          return {
            question: questionData.question,
            options: options,
            correctAnswer: questionData.correct_answer,
          };
        });

        setQuestions(formattedQuestions);
        setAnsweredQuestions(new Array(formattedQuestions.length).fill(false)); // Initialize answered state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError(`Failed to load questions. ${error.message}`);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleAnswer = () => {
    const updatedAnsweredQuestions = [...answeredQuestions];
    updatedAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(updatedAnsweredQuestions);
  };

  if (loading) {
    return <div>Loading questions...</div>; // Display loading message while questions are being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display any error message
  }

  if (questions.length === 0 || !questions[currentQuestion]) {
    return <div>No questions available.</div>; // If no questions are loaded, show this message
  }

  return (
    <div style={styles.page}>
      {/* Question Section */}
      <div style={styles.questionContainer}>
        <h3 style={styles.questionText}>
          Q{currentQuestion + 1}: {questions[currentQuestion].question}
        </h3>

        {/* Option Selection */}
        <div style={styles.options}>
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} style={styles.optionLabel}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                onChange={() => setSelectedAnswer(option)}
                disabled={answeredQuestions[currentQuestion]} // Disable radio buttons if already answered
                style={styles.radioInput}
              />
              <span style={styles.optionText}>{option}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          style={styles.submitButton}
          onClick={() => {
            handleAnswer();
            alert(selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Wrong!");
          }}
          disabled={!selectedAnswer || answeredQuestions[currentQuestion]} // Disable submit button if no option selected or question already answered
        >
          Submit Answer
        </button>
      </div>

      {/* Circle Navigation Section */}
      <div style={styles.navigationContainer}>
        {questions.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.circle,
              backgroundColor:
                currentQuestion === index
                  ? "#0056b3"
                  : answeredQuestions[index]
                  ? "#28a745"
                  : "#ccc",
            }}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;

// Add styles as a placeholder if not imported
const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  questionContainer: {
    marginBottom: "20px",
  },
  questionText: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Space between the option buttons
    marginTop: "20px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    padding: "10px",
    border: "1px solid #007bff", // Border for each option
    borderRadius: "4px",
    backgroundColor: "#f0f8ff", // Light background for better visibility
    transition: "background-color 0.3s",
  },
  radioInput: {
    marginRight: "4px", // Space between radio button and text
  },
  optionText: {
    fontSize: "16px",
    color: "#333",
    
  },
  submitButton: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
  submitButtonDisabled: {
    backgroundColor: "#ddd",
    cursor: "not-allowed",
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
