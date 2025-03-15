import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Software Engineer", "Cloud Enthusiast", "AI Explorer"];

const HeroSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const hasFetched = useRef(false);

  // Fetch view count with smooth animation
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetch("https://visitor-counter-backend.onrender.com/api/visitors")
        .then((response) => response.json())
        .then((data) => {
          const end = data.count;
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
        })
        .catch((error) => console.error("Error fetching view count:", error));
    }
  }, []);

  // Typing animation
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

  // Blinking cursor
  useEffect(() => {
    const cursorBlink = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Scroll to bottom function
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
            Hi, I’m <span>Kartikey Pandey</span>
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