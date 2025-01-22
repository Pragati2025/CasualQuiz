import React from 'react';
import '../styles/Header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title"> Quiz App</h1>
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
