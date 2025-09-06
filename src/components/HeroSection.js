import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Full-Stack Developer 🖥️", "Cloud Strategist ☁️", "Tech Enthusiast 🚀"];

/**
 * Read env vars in both Vite and CRA.
 */
function getEnv(keyVite, keyCRA) {
  // Vite
  if (typeof import.meta !== "undefined" && import.meta.env && keyVite in import.meta.env) {
    return import.meta.env[keyVite];
  }
  // CRA
  if (typeof process !== "undefined" && process.env && keyCRA in process.env) {
    return process.env[keyCRA];
  }
  return undefined;
}

function isDevEnv() {
  const viteDev =
    typeof import.meta !== "undefined" && import.meta.env && !!import.meta.env.DEV;
  const craDev =
    typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production";
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const hostLooksLocal =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
  return viteDev || craDev || hostLooksLocal;
}

function getApiBase() {
  const local =
    getEnv("VITE_API_BASE_LOCAL", "REACT_APP_API_BASE_LOCAL") || "http://localhost:5000";
  const prod = getEnv("VITE_API_BASE_PROD", "REACT_APP_API_BASE_PROD") || local;
  const base = isDevEnv() ? local : prod;
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
      if (isDevEnv()) {
        console.log("[HeroSection] setSafely called with:", n, "typeof:", typeof n);
      }
      if (typeof n === "number") {
        if (isDevEnv()) {
          console.log("[HeroSection] Setting viewCount to:", n);
        }
        setViewCount(n);
      }
    };

    const url = `${API_BASE}/api/views`;

    if (isDevEnv()) {
      console.log("[HeroSection] API_BASE =", API_BASE);
      console.log("[HeroSection] POST", url, "(increment visitor count)");
    }

    // First, POST to increment the visitor count
    fetch(url, { method: "POST" })
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text().catch(() => "");
          throw new Error(`POST ${url} -> ${r.status} ${r.statusText} ${text}`);
        }
        return r.json();
      })
      .then((data) => {
        if (isDevEnv()) {
          console.log("[HeroSection] POST response:", data);
        }
        setSafely(data?.total ?? 0);
      })
      .catch((err) => {
        if (isDevEnv()) console.error("[HeroSection] POST /api/views failed:", err);
        // Fallback: GET current count if POST fails
        if (isDevEnv()) console.log("[HeroSection] GET", url, "(fallback)");
        fetch(url)
          .then(async (r) => {
            if (!r.ok) {
              const text = await r.text().catch(() => "");
              throw new Error(`GET ${url} -> ${r.status} ${r.statusText} ${text}`);
            }
            return r.json();
          })
          .then((data) => setSafely(data?.total ?? 0))
          .catch((err2) => {
            if (isDevEnv()) console.error("[HeroSection] GET /api/views failed:", err2);
            setSafely(0);
          });
      });
  }, []);

  // Debug: Track viewCount changes
  useEffect(() => {
    if (isDevEnv()) {
      console.log("[HeroSection] viewCount state changed to:", viewCount);
    }
  }, [viewCount]);

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