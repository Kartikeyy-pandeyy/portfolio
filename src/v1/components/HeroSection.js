import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import "../styles/HeroSection.css";
import profilePic from "../assets/profile.jpg";
import portfolioData from "../assets/v1Content.json";

const VIEW_POLL_INTERVAL_MS = 5000;

const fetchCurrentViewCount = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch views: ${response.status}`);
    }

    const data = await response.json();
    return data?.total ?? 0;
  } catch (error) {
    console.error("Error fetching current view count:", error);
    return 0;
  }
};

const incrementAndFetchViewCount = async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return data?.total ?? 0;
    }

    return fetchCurrentViewCount(url);
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return fetchCurrentViewCount(url);
  }
};

const HeroSection = () => {
  const { profile } = portfolioData;
  const roles = useMemo(() => profile.heroRoles ?? [], [profile.heroRoles]);
  const [viewCount, setViewCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasInitialized = useRef(false);
  const hasAnimatedInitialViewsRef = useRef(false);

  const apiUrl = useMemo(
    () => `${profile.viewApiBaseUrl.replace(/\/+$/, "")}/api/views`,
    [profile.viewApiBaseUrl]
  );

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    incrementAndFetchViewCount(apiUrl).then(setViewCount);
  }, [apiUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCurrentViewCount(apiUrl).then(setViewCount);
    }, VIEW_POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [apiUrl]);

  useEffect(() => {
    if (!hasAnimatedInitialViewsRef.current && viewCount > 0) {
      hasAnimatedInitialViewsRef.current = true;

      const duration = 1500;
      const startTime = Date.now();
      let rafId;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(viewCount * easeOutQuart);

        setAnimatedCount(currentCount);

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setAnimatedCount(viewCount);
        }
      };

      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }

    if (hasAnimatedInitialViewsRef.current) {
      setAnimatedCount(viewCount);
    } else {
      setAnimatedCount(0);
    }

    return undefined;
  }, [viewCount]);

  const currentRole = useMemo(
    () => roles[currentRoleIndex] || "",
    [roles, currentRoleIndex]
  );

  useEffect(() => {
    const typeEffect = () => {
      const pauseBeforeDelete = 2000;

      if (!isDeleting && currentCharIndex <= currentRole.length) {
        setDisplayText(currentRole.substring(0, currentCharIndex));
        setCurrentCharIndex((prev) => prev + 1);

        if (currentCharIndex === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
          return;
        }
      } else if (isDeleting && currentCharIndex >= 0) {
        setDisplayText(currentRole.substring(0, currentCharIndex));
        setCurrentCharIndex((prev) => prev - 1);

        if (currentCharIndex === 0 && roles.length > 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentRole, roles.length]);

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            {profile.heroGreetingPrefix} <span>{profile.name}</span>
          </h1>
          <p className="animated-text">{displayText}</p>

          <div className="hero-buttons">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {profile.resumeButtonText}
            </a>
          </div>

          <div className="hero-stats">
            <p>
              {profile.viewLabel}: <span>{animatedCount}</span>
            </p>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={profilePic}
            alt={profile.profileImageAlt}
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
