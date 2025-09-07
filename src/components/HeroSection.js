import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

// 🔴 Replace this with your backend URL
const API_BASE = "https://jittery-nichole-kartikeyypandeyy-983ab902.koyeb.app"; 

// only one role now
const roles = ["DevOps Engineer 🖥"];
async function hitViews(url) {
  // First try POST (increment)
  let r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (r.ok) {
    const data = await r.json();
    return data?.total ?? 0;
  }

  // Fallback: GET (just read current total)
  r = await fetch(url);
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  const data = await r.json();
  return data?.total ?? 0;
}

const HeroSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const triedOnce = useRef(false);

  // 👀 Increment visitor count once on mount
  useEffect(() => {
    if (triedOnce.current) return;
    triedOnce.current = true;

    const url = `${API_BASE.replace(/\/+$/, "")}/api/views`;

    hitViews(url)
      .then((total) => setViewCount(total))
      .catch((err) => {
        console.error("[HeroSection] view counter failed:", err);
        setViewCount(0);
      });
  }, []);

  // 🎯 Animate count when viewCount changes
  useEffect(() => {
    if (viewCount <= 0) return;
    
    const duration = 2000; // 2 seconds
    const steps = Math.min(100, viewCount); // Max 100 steps for performance
    const increment = viewCount / steps;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedCount(viewCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(increment * currentStep));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [viewCount]);

  // ⌨️ Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 1000;

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

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Hi there, I’m <span>Kartikey Pandey</span>
          </h1>
          <p className="animated-text">{text}</p>

          <div className="hero-buttons">
            <a
              href="https://drive.google.com/file/d/1iWpLXLvLDtefO4mxrmpAm3M6sIxhqIO6/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              📜 Resume
            </a>
          </div>

          <div className="hero-stats">
            <p>
              👀 Views: <span>{animatedCount}</span>
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
