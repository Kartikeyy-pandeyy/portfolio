import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { FaUser, FaTools, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import portfolioData from "../assets/v1Content.json";

const navIconMap = {
  user: FaUser,
  tools: FaTools,
  project: FaProjectDiagram,
  envelope: FaEnvelope,
};

const Header = () => {
  const navItems = portfolioData.profile.navItems;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || "hero");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <nav className="nav">
          <ul>
            {navItems.map((item) => {
              const Icon = navIconMap[item.iconKey];

              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={activeSection === item.id ? "active" : ""}
                    aria-label={item.label}
                  >
                    <span className="nav-icon">{Icon ? <Icon /> : null}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
