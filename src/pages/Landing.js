import React from "react";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import ExperienceEducation from "../components/ExperienceEducation";
import Projects from "../components/Projects";
import GitHubStats from "../components/GitHubStats";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div>
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="experience-education">
        <ExperienceEducation />
      </div>
      <div id="about-me">
        <AboutMe />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="github-stats">
        <GitHubStats />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;