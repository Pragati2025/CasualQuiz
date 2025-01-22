// src/components/SignupPage.js
import React, { useState } from 'react';

const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = () => {
    if (validateEmail(email)) {
      setError('');
      onSignup(email);
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignupPage;
