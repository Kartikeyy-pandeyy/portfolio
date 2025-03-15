import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Projects.css";
import { FaBookOpen, FaGithub } from "react-icons/fa";

// Data for Projects & Research Work
const projectsData = [
  {
    id: 1,
    title: "Kartikey Care - OPD Ticket Booking",
    category: "Web",
    timeline: "Feb 2025 - Present",
    location: "Gorakhpur, India",
    techStack: ["React.js", "CSS", "Node.js", "MongoDB", "AWS Lambda"],
    description: [
      "Designed a modern, responsive UI using React.js and plain CSS, achieving 95+ Lighthouse scores.",
      "Developed an interactive booking system with real-time slot updates, improving user experience by 40%.",
      "Integrated qrcode.js for O(1) QR generation, optimizing appointment validation efficiency.",
      "Investigating AWS CloudFront integration for sub-millisecond response times via edge caching.",
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/kartikeycare",
  },
  {
    id: 2,
    title: "Microservices Calculator",
    category: "Cloud",
    timeline: "Jan 2025 - Feb 2025",
    location: "Gorakhpur, India",
    techStack: ["React.js", "API Gateway", "AWS CloudFront", "Railway"],
    description: [
      "Built an interactive calculator UI using React.js and Material UI, ensuring smooth animations.",
      "Integrated serverless microservices architecture, reducing backend load by 60%.",
      "Optimized frontend rendering via code-splitting and Webpack, achieving sub-1s load times.",
      "Deployed on AWS S3 & CloudFront for global availability and 99.9% uptime.",
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/frontend-calculator",
  },
  {
    id: 3,
    title: "Landslide Prediction System",
    category: "AI",
    timeline: "Aug 2024 - Oct 2024",
    location: "Gorakhpur, India",
    techStack: ["Flask", "React.js", "Python", "AWS Lambda", "EC2", "SNS"],
    description: [
      "Developed a landslide prediction dashboard using React.js, enabling real-time visualization.",
      "Achieved 86.93% model accuracy using Random Forest with Optuna hyperparameter tuning.",
      "Integrated AWS SNS for instant disaster alerts, reducing response time by 45%.",
      "Designed a mobile-responsive UI ensuring accessibility compliance.",
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/landslide-alert-system",
  },
];

const researchData = [
  {
    id: 1,
    title: "AI-Driven Predictive Maintenance for Railways Ecosystem (RES)",
    conference: "ICRIC-07, DoSCI 2025, INDIAcom-2025 (Accepted)",
    description:
      "This research explores how AI and edge computing can transform railway maintenance by predicting and preventing equipment failures. By integrating differential privacy and model pruning, we ensure secure and efficient AI deployment on resource-constrained edge devices. This approach reduces latency, enhances railway efficiency, and provides real-world solutions for equipment failure prevention.",
    githubLink: "https://github.com/Kartikeyy-pandeyy/AI-Driven-Predictive-Maintenance",
  },
  {
    id: 2,
    title: "Performance Analysis of Docker Containers & VMs",
    conference: "NGISE 2025 (Accepted)",
    description:
      "This study compares Docker containers and Virtual Machines, analyzing their strengths and trade-offs. Containers offer high performance for CPU and I/O-bound tasks, making them ideal for cloud-native applications, whereas VMs provide better resource isolation and stability under heavy workloads. Understanding these differences helps system administrators optimize performance and resource utilization.",
    githubLink: "https://github.com/Kartikeyy-pandeyy/performance-analysis",
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Projects");

  return (
    <section className="projects-research">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects & Research
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Explore my best projects and research publications.
      </motion.p>

      {/* Particles for Cosmic Effect */}
      <div className="projects-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{ '--direction-x': Math.random() * 2 - 1, '--direction-y': Math.random() * 2 - 1 }}
          />
        ))}
      </div>

      {/* Tab Navigation */}
      <motion.div
        className="tabs"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {["Projects", "Research"].map((tab) => (
          <motion.button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Content Based on Active Tab */}
      <div className="content">
        {activeTab === "Projects" ? (
          <div className="projects-grid">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: project.id * 0.1 }}
              >
                <h3>{project.title}</h3>
                <p><strong>{project.timeline}</strong> - {project.location}</p>
                <ul>
                  {project.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="tech-stack">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="tech-badge"
                      whileHover={{ scale: 1.1, backgroundColor: "#8A2BE2" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaGithub /> Check out on GitHub
                </motion.a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="research-grid">
            {researchData.map((paper) => (
              <motion.div
                key={paper.id}
                className="research-card"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(138, 43, 226, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: paper.id * 0.1 }}
              >
                <h3>{paper.title}</h3>
                <p><FaBookOpen /> {paper.conference}</p>
                <p className="research-description">{paper.description}</p>
                <motion.a
                  href={paper.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(138, 43, 226, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaGithub /> Check out on GitHub
                </motion.a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;