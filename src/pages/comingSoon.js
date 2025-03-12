import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing sun and moon icons
import '../styles/comingSoon.css';

const ComingSoonPage = () => {
  // State to manage light/dark theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);  // Toggle between light and dark mode
  };

  return (
    <div className={`coming-soon-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Theme Toggle Icon */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? <FaMoon /> : <FaSun />} {/* Display moon for dark mode, sun for light mode */}
      </button>

      {/* Message */}
      <h1 className="message">
        I’ll be here soon. Meanwhile, feel free to explore my <a href="https://www.linkedin.com/in/kartikey-pandey-5788aa252/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </h1>
    </div>
  );
};

export default ComingSoonPage;
