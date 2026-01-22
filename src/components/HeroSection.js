import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const API_BASE = "https://jittery-nichole-kartikeyypandeyy-983ab902.koyeb.app";

const roles = ["DevOps Engineer 🖥"];

const fetchViewCount = async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data?.total ?? 0;
    }

    const getResponse = await fetch(url);
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch views: ${getResponse.status}`);
    }
    
    const data = await getResponse.json();
    return data?.total ?? 0;
  } catch (error) {
    console.error("Error fetching view count:", error);
    return 0;
  }
};

const HeroSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasInitialized = useRef(false);

  const apiUrl = useMemo(() => `${API_BASE.replace(/\/+$/, "")}/api/views`, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    fetchViewCount(apiUrl).then(setViewCount);
  }, [apiUrl]);

  const animateViewCount = useCallback(() => {
    if (viewCount <= 0) return;
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(viewCount * easeOutQuart);
      
      setAnimatedCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedCount(viewCount);
      }
    };
    
    requestAnimationFrame(animate);
  }, [viewCount]);

  useEffect(() => {
    animateViewCount();
  }, [animateViewCount]);

  const currentRole = useMemo(() => roles[currentRoleIndex] || "", [currentRoleIndex]);

  useEffect(() => {
    const typeEffect = () => {
      const pauseBeforeDelete = 2000;

      if (!isDeleting && currentCharIndex <= currentRole.length) {
        setDisplayText(currentRole.substring(0, currentCharIndex));
        setCurrentCharIndex(prev => prev + 1);
        
        if (currentCharIndex === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
          return;
        }
      } else if (isDeleting && currentCharIndex >= 0) {
        setDisplayText(currentRole.substring(0, currentCharIndex));
        setCurrentCharIndex(prev => prev - 1);
        
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentRole, currentRoleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Hi there, I’m <span>Kartikey Pandey</span>
          </h1>
          <p className="animated-text">{displayText}</p>

          <div className="hero-buttons">
            <a
              href="https://drive.google.com/drive/folders/1Uy-CNQhP0zSX_PYlr2-90YTE9hwT3xHG?usp=sharing"
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
          <img 
            src={profilePic} 
            alt="Kartikey Pandey - DevOps Engineer" 
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
