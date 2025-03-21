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
  const [blink, setBlink] = useState(true);
  const hasCounted = useRef(false);

  // Handle view count with localStorage and animation
  useEffect(() => {
    if (!hasCounted.current) {
      hasCounted.current = true;

      // Get initial count from localStorage, default to 0 if not set
      let storedCount = parseInt(localStorage.getItem("viewCount") || "0", 10);
      storedCount += 1; // Increment the count
      localStorage.setItem("viewCount", storedCount); // Save updated count

      // Animation logic
      const end = storedCount;
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const easeOutQuad = (t) => t * (2 - t);
      const animateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        start = Math.floor(easedProgress * end);
        setViewCount(start);
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }
  }, []);

  // Typing animation (unchanged)
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 1200;
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

  // Blinking cursor (unchanged)
  useEffect(() => {
    const cursorBlink = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Scroll to bottom function (unchanged)
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
          <p className="animated-text">
            {text}
            <span className={`cursor ${blink ? "blink" : ""}`}>|</span>
          </p>
          <div className="hero-buttons">
            <a
              href="https://drive.google.com/file/d/1TtCOg7oCx6b-BBKRu7PtbabLCDHX_LHr/view?usp=sharing"
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
          <img src={profilePic} alt="Kartikey Pandey" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;