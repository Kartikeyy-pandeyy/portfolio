import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Full-Stack Developer 🖥️", "Cloud Strategist ☁️", "Tech Enthusiast 🚀"];

/** ====== CRA-only env helpers ====== */
function getCRAEnv(key) {
  return (typeof process !== "undefined" && process.env && process.env[key]) || undefined;
}

function isLocalHost() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1";
}

function getApiBase() {
  const local = getCRAEnv("REACT_APP_API_BASE_LOCAL") || "http://localhost:5000";
  const prod  = getCRAEnv("REACT_APP_API_BASE_PROD"); // <-- must be set on Netlify

  // If running on localhost, always use local; otherwise require prod (fallback to local if missing)
  const base = isLocalHost() ? local : (prod || local);

  // One-time runtime debug
  if (typeof window !== "undefined" && !window.__API_BASE_LOGGED__) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[HeroSection] API_BASE resolved:", base, {
        local,
        prod,
        hostname: window.location.hostname,
        NODE_ENV: process.env.NODE_ENV,
      });
    } else if (!prod) {
      // eslint-disable-next-line no-console
      console.warn("[HeroSection] REACT_APP_API_BASE_PROD is missing; using local in prod:", base);
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
      if (process.env.NODE_ENV !== "production") {
        console.log("[HeroSection] setSafely:", n, "typeof:", typeof n);
      }
      if (typeof n === "number") setViewCount(n);
    };

    const url = `${API_BASE}/api/views`;

    if (process.env.NODE_ENV !== "production") {
      console.log("[HeroSection] POST", url, "(increment)");
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include", // <-- only if your server needs cookies
    })
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text().catch(() => "");
          throw new Error(`POST ${url} -> ${r.status} ${r.statusText} ${text}`);
        }
        return r.json();
      })
      .then((data) => setSafely(data?.total ?? 0))
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("[HeroSection] POST /api/views failed:", err);
          console.log("[HeroSection] GET", url, "(fallback)");
        }
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
            if (process.env.NODE_ENV !== "production") {
              console.error("[HeroSection] GET /api/views failed:", err2);
            }
            setSafely(0);
          });
      });
  }, []);

  // Debug: Track viewCount changes
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[HeroSection] viewCount changed:", viewCount);
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
