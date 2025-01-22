// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ onExpire, timeLimit }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  
  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  return (
    <div className="timer">
      <h3>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h3>
    </div>
  );
};

export default Timer;
