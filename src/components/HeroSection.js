import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";

const roles = ["Full-Stack Developer 🖥️", "Cloud Strategist ☁️", "Tech Enthusiast 🚀"];

/** ====== CRA-only env helpers (STRICT, no fallbacks) ====== */
function getEnv(key) {
  return (typeof process !== "undefined" && process.env && process.env[key]) || undefined;
}

/** Resolve API base strictly from REACT_APP_ENVIRONMENT */
function resolveApiBaseStrict() {
  const envMode = getEnv("REACT_APP_ENVIRONMENT"); // "local" | "prod"
  const local = getEnv("REACT_APP_API_BASE_LOCAL");
  const prod  = getEnv("REACT_APP_API_BASE_PROD");

  // Validate presence
  if (!envMode) {
    throw new Error(
      "[HeroSection] REACT_APP_ENVIRONMENT is missing (expected 'local' or 'prod')."
    );
  }
  if (envMode !== "local" && envMode !== "prod") {
    throw new Error(
      `[HeroSection] REACT_APP_ENVIRONMENT must be 'local' or 'prod', got '${envMode}'.`
    );
  }
  if (envMode === "local" && !local) {
    throw new Error("[HeroSection] REACT_APP_API_BASE_LOCAL is missing.");
  }
  if (envMode === "prod" && !prod) {
    throw new Error("[HeroSection] REACT_APP_API_BASE_PROD is missing.");
  }

  const base = envMode === "local" ? local : prod;

  // One-time log to verify at runtime
  if (typeof window !== "undefined" && !window.__API_BASE_LOGGED__) {
    // eslint-disable-next-line no-console
    console.log("[HeroSection] API_BASE resolved (strict):", {
      REACT_APP_ENVIRONMENT: envMode,
      base,
    });
    window.__API_BASE_LOGGED__ = true;
  }

  return String(base).replace(/\/+$/, "");
}

let API_BASE;
try {
  API_BASE = resolveApiBaseStrict();
} catch (e) {
  // Log visibly and keep undefined to prevent accidental localhost calls
  // eslint-disable-next-line no-console
  console.error(e?.message || e);
  API_BASE = undefined;
}

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

    if (!API_BASE) {
      // Env misconfigured; do not attempt any network calls
      return;
    }

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
        // Fallback: GET current if POST fails (still strict to the chosen base)
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
