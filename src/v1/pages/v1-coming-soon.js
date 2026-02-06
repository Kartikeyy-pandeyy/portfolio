import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "../styles/comingSoon.css";
import portfolioData from "../assets/v1Content.json";

const ComingSoonPage = () => {
  const { comingSoon } = portfolioData;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`coming-soon-container ${isDarkMode ? "dark" : "light"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </button>
      <h1 className="message">
        {comingSoon.messagePrefix}{" "}
        <a
          href={comingSoon.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {comingSoon.linkedInLabel}
        </a>
        .
      </h1>
    </div>
  );
};

export default ComingSoonPage;
