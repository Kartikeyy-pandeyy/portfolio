import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import "../styles/stars.css";

export default function StarsBackground() {
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [dots, setDots] = useState(""); // State for animated dots
  const [blackout, setBlackout] = useState(false);
  const navigate = useNavigate();

  // Function to determine the greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour === 12) return "Good Noon";
    if (hour > 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 19) return "Good Evening";
    return "Good Night";
  };

  // Show greeting after 2 seconds with typewriter effect
  useEffect(() => {
    setGreeting(""); // Reset before starting

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

          // Start adding dots
          let dotIndex = 0;
          const dotInterval = setInterval(() => {
            setDots(".".repeat(dotIndex % 4)); // Loops from "" → "." → ".." → "..." → ""
            dotIndex++;
          }, 300);

          setTimeout(() => {
            clearInterval(dotInterval); // Stop dots when blackout starts
            setBlackout(true);
            setTimeout(() => navigate("/landing"), 1200); // Navigate after blackout
          }, 3000);
        }
      }, 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]); // ✅ Now navigate is included properly

  return (
    <div className="stars-container">
      {!blackout && (
        <Canvas>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 3, 3]} intensity={0.8} />
          <RealisticStars />
          <FloatingParticles />
        </Canvas>
      )}

      {showGreeting && !blackout && (
        <div className="greeting-text">
          {greeting}
          <span className="dots">{dots}</span> {/* Animated dots */}
        </div>
      )}

      {blackout && <div className="blackout"></div>}
    </div>
  );
}

// ✨ Realistic Stars Effect
function RealisticStars() {
  const starsRef = useRef();

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.03; // Slower, natural movement
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <>
      <Stars
        ref={starsRef}
        radius={400}
        depth={200}
        count={15000} // More stars for a realistic sky
        factor={3} // Adjust star clustering
        saturation={0}
        fade
        speed={0.4} // Slower star movement for realism
      />
      <Stars
        radius={300}
        depth={150}
        count={5000} // Add another layer for better depth
        factor={2.2}
        saturation={0}
        fade
        speed={0.2}
      />
    </>
  );
}

// ✨ Floating Particles for Extra Space Vibes
function FloatingParticles() {
  return (
    <Sparkles
      count={200}
      size={2}
      scale={500}
      color={"#ffffff"}
      speed={0.5}
      opacity={0.8}
    />
  );
}
