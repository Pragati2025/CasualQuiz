import React, { useState } from 'react';

const StartPage = ({ email, setEmail, onStartQuiz, emailError }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Regular expression for strict email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Function to handle sign-up
  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Validate email format with regex
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setError('');
        setIsSignUp(false);
        alert("Sign-up successful!");
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="start-page">
      <h2>Welcome to the Quiz!</h2>
      <p>Enter your email to start the quiz:</p>
      {!isSignUp ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <button onClick={onStartQuiz}>Start Quiz</button>
          <p onClick={() => setIsSignUp(true)} style={{ cursor: 'pointer', color: 'blue' }}>
            Don't have an account? Sign up here
          </p>
        </>
      ) : (
        <>
          <h3>Create an Account</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <p onClick={() => setIsSignUp(false)} style={{ cursor: 'pointer', color: 'blue' }}>
            Already have an account? Login here
          </p>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default StartPage;
