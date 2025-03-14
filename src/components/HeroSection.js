import React, { useState, useEffect } from 'react';
import '../styles/HeroSection.css';
import profilePic from '../assets/profile.jpg';

const roles = ["Software Engineer", "Cloud Enthusiast", "AI Explorer"];

const HeroSection = () => {
    const [viewCount, setViewCount] = useState(0);
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        fetch('https://api.countapi.xyz/hit/kartikeyypandeyy.netlify.app/visits')
            .then(response => response.json())
            .then(data => setViewCount(data.value))
            .catch(error => console.error("Error fetching view count:", error));
    }, []);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const timeout = setTimeout(() => {
            setText(isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1));
            setCharIndex(prev => (isDeleting ? prev - 1 : prev + 1));

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex]);

    useEffect(() => {
        const cursorBlink = setInterval(() => setBlink(prev => !prev), 500);
        return () => clearInterval(cursorBlink);
    }, []);

    return (
        <section className="hero">
            <div className="hero-glass"></div>
            <div className="hero-content">
                <h1>Hi, I’m <span>Kartikey Pandey</span></h1>
                <p className="animated-text">{text}<span className={`cursor ${blink ? 'blink' : ''}`}>|</span></p>

                <div className="hero-buttons">
                    <a href="/resume.pdf" download className="neumorphic-btn">📜 Download Resume</a>
                    <a href="#contact" className="neumorphic-btn">📩 Contact Me</a>
                </div>

                <div className="stats">
                    <p>👀 Views: <span>{viewCount}</span></p>
                </div>
            </div>

            <div className="hero-image">
                <div className="image-border">
                    <img src={profilePic} alt="Kartikey Pandey" className="pop-on-hover" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;