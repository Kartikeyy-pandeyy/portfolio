// Landing.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import ExperienceEducation from '../components/ExperienceEducation';
import Projects from '../components/Projects';
import GitHubStats from '../components/GitHubStats';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';

const Landing = () => {
    return (
        <div>
            <HeroSection />
            <AboutMe />
            <ExperienceEducation />
            <Projects />
            <GitHubStats />
            <Achievements />
            <Contact />
        </div>
    );
};
export default Landing;
