import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

  // 🎯 Optimized count animation with requestAnimationFrame
  useEffect(() => {
    if (viewCount <= 0) return;
    
    const duration = 1500; // Reduced to 1.5 seconds for snappier UX
    const startTime = Date.now();
    const startCount = 0;
    
    const animateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutQuart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startCount + (viewCount - startCount) * easeOutQuart);
      
      setAnimatedCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setAnimatedCount(viewCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [viewCount]);

  // ⌨️ Optimized typing animation with useCallback
  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);
  
  const typeText = useCallback(() => {
    const typingSpeed = isDeleting ? 40 : 80; // Slightly faster for better UX
    const pauseBeforeDelete = 800; // Reduced pause

    setText(prevText => 
      isDeleting
        ? currentRole.substring(0, charIndex - 1)
        : currentRole.substring(0, charIndex + 1)
    );
    
    setCharIndex(prev => isDeleting ? prev - 1 : prev + 1);

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }
  }, [charIndex, isDeleting, roleIndex, currentRole]);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting]);

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
