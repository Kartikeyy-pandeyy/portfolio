import React, { Suspense, lazy } from "react";
import "../styles/Landing.css";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Lazy load components for better performance
const AboutMe = lazy(() => import("../components/AboutMe"));
const ExperienceEducation = lazy(() => import("../components/ExperienceEducation"));
const Projects = lazy(() => import("../components/Projects"));
const GitHubStats = lazy(() => import("../components/GitHubStats"));
const Contact = lazy(() => import("../components/Contact"));

// Loading component for better UX
const SectionLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    color: '#00FFFF',
    fontSize: '1rem'
  }}>
    Loading...
  </div>
);

const Landing = () => {
  return (
    <div className="landing-container">
      <Header />
      
      {/* Critical above-the-fold content - not lazy loaded */}
      <main>
        <section id="hero" className="section-wrapper">
          <HeroSection />
        </section>
        
        {/* Lazy loaded sections for performance */}
        <Suspense fallback={<SectionLoader />}>
          <section id="experience-education" className="section-wrapper">
            <ExperienceEducation />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <section id="about-me" className="section-wrapper">
            <AboutMe />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <section id="projects" className="section-wrapper">
            <Projects />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <section id="github-stats" className="section-wrapper">
            <GitHubStats />
          </section>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <section id="contact" className="section-wrapper">
            <Contact />
          </section>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;