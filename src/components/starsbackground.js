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
    if (hour >= 5 && hour < 7) return "Dawn Breaks";     // Early sunrise  
    if (hour >= 7 && hour < 9) return "Fresh Morn";      // Crisp morning  
    if (hour >= 9 && hour < 11) return "Day Begins";     // Start of activity  
    if (hour >= 11 && hour < 13) return "Midday Shine";  // Late morning energy  
    if (hour >= 13 && hour < 15) return "High Noon";     // Peak sun  
    if (hour >= 15 && hour < 17) return "Slow Afternoons"; // Soft mellow feel  
    if (hour >= 17 && hour < 19) return "Fading Light";  // Golden hour  
    if (hour >= 19 && hour < 21) return "Evening Stirs"; // Settling down  
    if (hour >= 21 && hour < 23) return "Night’s Here";  // Calm and immersive  
    return "Midnight Hush";  // Deep night quiet  
};



  // Greeting sequence
  useEffect(() => {
    const showGreetingSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Initial delay
      setShowGreeting(true);

      const text = getGreeting();
      let typedText = "";
      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 120));
        typedText += text[i];
        setGreeting(typedText);
      }

      let dotIndex = 0;
      const dotLoop = setInterval(() => {
        setDots(".".repeat(dotIndex % 4));
        dotIndex++;
      }, 400);

      await new Promise((resolve) => setTimeout(resolve, 3500)); // Pause before blackout
      clearInterval(dotLoop);
      setBlackout(true);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Blackout duration
      navigate("/landing");
    };

    showGreetingSequence();
  }, [navigate]);

  // Stars and shooting stars
  useEffect(() => {
    const container = document.querySelector(".cosmos-container");
    if (!container) return;

    const stars = document.querySelectorAll(".star");
    stars.forEach((star, idx) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const size = 1 + Math.random() * 2;
      const delay = idx * 0.02;
      const animationDuration = 3 + Math.random() * 3;
      star.style.left = `${randomX}vw`;
      star.style.top = `${randomY}vh`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${animationDuration}s`;
    });

    const maxShootingStars = 5;
    let shootingStarCount = 0;
    const createShootingStar = () => {
      if (shootingStarCount >= maxShootingStars) return;
      shootingStarCount++;
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      container.appendChild(shootingStar);
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 15;
      const angle = 35 + Math.random() * 20;
      const speed = 1.2 + Math.random() * 0.6;
      shootingStar.style.left = `${startX}vw`;
      shootingStar.style.top = `${startY}vh`;
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animationDuration = `${speed}s`;
      setTimeout(() => {
        shootingStar.remove();
        shootingStarCount--;
      }, speed * 1000);
    };
    const shootingInterval = setInterval(createShootingStar, 5000);

    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleMouseMove = throttle((e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    }, 16);

    const handleTouchMove = throttle((e) => {
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 100;
      const y = (touch.clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    }, 16);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      clearInterval(shootingInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const starCount = Math.min(window.innerWidth < 768 ? 220 : 500, navigator.hardwareConcurrency * 100 || 500);

  return (
    <div className={`cosmos-container ${blackout ? "warping" : ""}`}>
      <div aria-label={`Greeting: ${greeting}${dots}`} className="greeting-wrapper">
        {showGreeting && !blackout && (
          <div className="greeting-text">
            <span className="greeting-line1">{greeting.split(" ")[0]}</span>
            <span className="greeting-line2">{greeting.split(" ")[1]}</span>
            <span className="dots">{dots}</span>
            <span className="cursor"></span>
          </div>
        )}
      </div>
      {blackout && <div className="blackout"></div>}
      {Array.from({ length: starCount }).map((_, index) => (
        <div key={index} className={`star star-type-${(index % 10) + 1}`}></div>
      ))}
    </div>
  );
}