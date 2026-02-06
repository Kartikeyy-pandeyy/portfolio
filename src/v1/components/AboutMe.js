import React, { useMemo } from "react";
import "../styles/AboutMe.css";
import portfolioData from "../assets/v1Content.json";
import {
  FaGamepad,
  FaMusic,
  FaGlobe,
  FaCamera,
  FaJava,
  FaCode,
  FaMobileAlt,
  FaBookOpen,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiHelm,
} from "react-icons/si";
import { motion } from "framer-motion";

const techIconMap = {
  java: FaJava,
  mongodb: SiMongodb,
  mysql: SiMysql,
  code: FaCode,
  aws: SiAmazonwebservices,
  gcp: SiGooglecloud,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  jenkins: SiJenkins,
  helm: SiHelm,
};

const hobbyIconMap = {
  music: FaMusic,
  gaming: FaGamepad,
  traveling: FaGlobe,
  photography: FaCamera,
  mobile: FaMobileAlt,
  book: FaBookOpen,
};

const renderIcon = (iconMap, iconKey, iconClass) => {
  const Icon = iconMap[iconKey];
  if (!Icon) return null;
  return <Icon className={`icon ${iconClass || ""}`.trim()} />;
};

// Optimized motion variants with better performance
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    scale: 0.99,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      delay: i * 0.03, 
      duration: 0.15, 
      ease: [0.4, 0, 0.2, 1]
    }
  }),
  hover: {
    scale: 1.04,
    y: -6,
    zIndex: 10,
    transition: { 
      duration: 0.1, 
      ease: [0.4, 0, 0.2, 1],
      type: "tween"
    }
  }
};

const innerCardVariants = {
  hover: {
    scale: 1.06,
    transition: { 
      duration: 0.1, 
      ease: [0.4, 0, 0.2, 1],
      type: "tween"
    }
  }
};

const AboutMe = () => {
  const { about } = portfolioData;

  // Memoize particles for better performance
  const particles = useMemo(() => 
    Array.from({ length: 4 }, (_, i) => (
      <span
        key={i}
        className="particle"
        style={{ 
          "--direction-x": Math.random() * 2 - 1, 
          "--direction-y": Math.random() * 2 - 1,
          "--delay": `${Math.random() * 2}s`
        }}
      />
    )), []
  );

  return (
    <section className="about-me">
      <div className="about-particles">
        {particles}
      </div>
      <div className="about-content">
        <motion.p
          className="about-bio"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {about.bio}
        </motion.p>

        <h3 className="section-title">{about.techTitle}</h3>
        <div className="tech-stack">
          {about.techStack.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="card tech-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              <motion.div className="inner-card" variants={innerCardVariants}>
                {renderIcon(techIconMap, tech.iconKey, tech.iconClass)}
              </motion.div>
              <div className="card-content">
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="section-title">{about.hobbiesTitle}</h3>
        <div className="hobby-container">
          {about.hobbies.map((hobby, index) => (
            <motion.div
              key={`${hobby.name}-${index}`}
              className="card hobby-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              <motion.div className="inner-card" variants={innerCardVariants}>
                {renderIcon(hobbyIconMap, hobby.iconKey, hobby.iconClass)}
              </motion.div>
              <div className="card-content">
                <h4>{hobby.name}</h4>
                <p>{hobby.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
