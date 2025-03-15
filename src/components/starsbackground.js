import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/stars.css";

export default function StarsBackground() {
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [dots, setDots] = useState("");
  const [blackout, setBlackout] = useState(false);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour === 12) return "Good Noon";
    if (hour > 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 19) return "Good Evening";
    return "Good Night";
  };

  // Greeting effect with smooth fade-in and typing
  useEffect(() => {
    setGreeting("");
    const timer = setTimeout(() => {
      setShowGreeting(true);
      const text = getGreeting();
      let index = 0;
      let typedText = "";
      const interval = setInterval(() => {
        typedText += text[index];
        setGreeting(typedText);
        index++;
        if (index === text.length) {
          clearInterval(interval);
          let dotIndex = 0;
          const dotInterval = setInterval(() => {
            setDots(".".repeat(dotIndex % 4));
            dotIndex++;
          }, 400); // Slower dots for subtlety
          setTimeout(() => {
            clearInterval(dotInterval);
            setBlackout(true);
            setTimeout(() => navigate("/landing"), 2000); // Extended blackout duration
          }, 3500); // Longer pause before blackout
        }
      }, 120); // Slightly slower typing
    }, 1500); // Earlier start for smoother flow

    return () => clearTimeout(timer);
  }, [navigate]);

  // Stars and shooting stars
  useEffect(() => {
    // Star positioning with subtle entry
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, idx) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const size = 1 + Math.random() * 2;
      const delay = idx * 0.02; // Staggered entry
      star.style.left = `${randomX}vw`;
      star.style.top = `${randomY}vh`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
    });

    // Subtle shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      document.querySelector(".cosmos-container").appendChild(shootingStar);
      const startX = Math.random() * 80 + 10; // Avoid edges
      const startY = Math.random() * 15;
      const angle = 35 + Math.random() * 20; // Narrower range for subtlety
      const speed = 1.2 + Math.random() * 0.6; // Slower, smoother streaks
      shootingStar.style.left = `${startX}vw`;
      shootingStar.style.top = `${startY}vh`;
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animationDuration = `${speed}s`;
      setTimeout(() => shootingStar.remove(), speed * 1000);
    };
    const shootingInterval = setInterval(createShootingStar, 5000); // Less frequent

    // Mouse movement for dynamic glow
    const handleMouseMove = (e) => {
      const container = document.querySelector(".cosmos-container");
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(shootingInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const starCount = window.innerWidth < 768 ? 80 : 150;

  return (
    <div className={`cosmos-container ${blackout ? "warping" : ""}`}>
      {showGreeting && !blackout && (
        <div className="greeting-text" aria-label={`Greeting: ${greeting}${dots}`}>
          {greeting}
          <span className="dots">{dots}</span>
        </div>
      )}
      {blackout && <div className="blackout"></div>}
      {Array.from({ length: starCount }).map((_, index) => (
        <div key={index} className="star"></div>
      ))}
    </div>
  );
}