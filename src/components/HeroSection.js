import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Full-Stack Developer 🖥️", "Cloud Strategist ☁️", "Tech Enthusiast 🚀"];

const HeroSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasCounted = useRef(false);

  // Simplified view count animation
  useEffect(() => {
    if (!hasCounted.current) {
      hasCounted.current = true;
      let storedCount = parseInt(localStorage.getItem("viewCount") || "105", 10);
      storedCount += 1;
      localStorage.setItem("viewCount", storedCount);
      setViewCount(storedCount); // Direct set instead of heavy animation
    }
  }, []);

  // Typing animation (slightly faster)
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80; // Increased speed
    const pauseBeforeDelete = 800; // Reduced pause
    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Removed blinking cursor effect to reduce overhead
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Hi there, I’m <span>Kartikey Pandey</span>
          </h1>
          <p className="animated-text">{text}</p>
          <div className="hero-buttons">
            <a
              href="https://drive.google.com/file/d/194pMNZF1s6YmScIDe2n_hQGSapceq6Ub/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              📜 Resume
            </a>
            <button onClick={scrollToBottom} className="btn">
              📩 Contact
            </button>
          </div>
          <div className="hero-stats">
            <p>
              👀 Views: <span>{viewCount}</span>
            </p>
          </div>
        </div>
        <div className="hero-image">
          <img src={profilePic} alt="Kartikey Pandey" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;