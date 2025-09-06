import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Full-Stack Developer 🖥️", "Cloud Strategist ☁️", "Tech Enthusiast 🚀"];

/** ====== CRA-only env helpers ====== */
function craEnv(key) {
  return (typeof process !== "undefined" && process.env && process.env[key]) || undefined;
}

function isLocalHost() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1";
}

function getApiBase() {
  // Check if we're in production build
  const isProduction = process.env.NODE_ENV === 'production';
  
  const local = craEnv("REACT_APP_API_BASE_LOCAL") || "http://localhost:5000";
  const prod = craEnv("REACT_APP_API_BASE_PROD") || "https://jittery-nichole-kartikeyypandeyy-983ab902.koyeb.app";
  const fb = craEnv("REACT_APP_API_BASE_FALLBACK");

  // If on localhost, use local. If production build, use prod. Otherwise fallback logic.
  let base;
  if (isLocalHost()) {
    base = local;
  } else if (isProduction) {
    base = prod;
  } else {
    base = prod || fb || local;
  }

  // One-time debug
  if (typeof window !== "undefined" && !window.__API_BASE_LOGGED__) {
    // eslint-disable-next-line no-console
    console.log("[HeroSection] API_BASE resolved:", base, {
      local,
      prod,
      fallback: fb,
      hostname: window.location.hostname,
      NODE_ENV: process.env.NODE_ENV,
      isProduction,
      isLocalHost: isLocalHost(),
    });
    if (!isLocalHost() && isProduction && !craEnv("REACT_APP_API_BASE_PROD")) {
      // eslint-disable-next-line no-console
      console.warn("[HeroSection] REACT_APP_API_BASE_PROD missing at build; using hardcoded fallback.");
    }
    window.__API_BASE_LOGGED__ = true;
  }

  return base.replace(/\/+$/, "");
}

const API_BASE = getApiBase();

const HeroSection = () => {
  const [viewCount, setViewCount] = useState(0);
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasIncremented = useRef(false);

  // 👀 Increment visitor count and fetch total on mount
  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    const setSafely = (n) => {
      if (typeof n === "number") setViewCount(n);
    };

    const url = `${API_BASE}/api/views`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // only if your server expects cookies
    })
      .then(async (r) => {
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          throw new Error(`POST ${url} -> ${r.status} ${r.statusText} ${t}`);
        }
        return r.json();
      })
      .then((data) => setSafely(data?.total ?? 0))
      .catch(() => {
        // Fallback: GET current if POST fails
        fetch(url)
          .then(async (r) => {
            if (!r.ok) {
              const t = await r.text().catch(() => "");
              throw new Error(`GET ${url} -> ${r.status} ${r.statusText} ${t}`);
            }
            return r.json();
          })
          .then((data) => setSafely(data?.total ?? 0))
          .catch(() => setSafely(0));
      });
  }, []);

  // ⌨️ Typing animation (unchanged)
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
              href="https://drive.google.com/file/d/1lVgd3Cl_LIk0x23lflgeBK6rzWg8ZWaU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              📜 Resume
            </a>
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
