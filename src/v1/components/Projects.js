import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "../styles/Projects.css";
import { FaBookOpen, FaGithub, FaRocket } from "react-icons/fa";
import portfolioData from "../assets/v1Content.json";

const Projects = () => {
  const { projectsResearch } = portfolioData;
  const {
    title,
    subtitle,
    tabs,
    projects,
    research,
    githubButtonText,
    liveButtonText,
  } = projectsResearch;

  const [activeTab, setActiveTab] = useState(tabs[0] || "Projects");

  // Memoize tab change handler
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Memoize current data based on active tab
  // (Removed unused currentData variable)

  // Optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 12,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  return (
    <section className="projects-research">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        className="tabs"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabChange(tab)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="content"
        key={activeTab} // Force re-render on tab change
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {activeTab === tabs[0] ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -4,
                  transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3>{project.title}</h3>
                <p><strong>{project.timeline}</strong></p>
                <ul>
                  {project.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="tech-stack">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-button"
                  >
                    <FaGithub /> {githubButtonText}
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-button"
                  >
                    <FaRocket /> {liveButtonText}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="research-grid">
            {research.map((paper) => (
              <motion.div
                key={paper.id}
                className="research-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -4,
                  transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3>{paper.title}</h3>
                <p><FaBookOpen /> {paper.conference}</p>
                <p className="research-description">{paper.description}</p>
                <a
                  href={paper.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                >
                  <FaGithub /> {githubButtonText}
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
