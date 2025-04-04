import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Projects.css";
import { FaBookOpen, FaGithub } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "UPSCPath: AI-Powered Study Platform",
    category: "AI/EdTech",
    timeline: "March 2025 - Present",
    techStack: ["React.js", "Node.js", "MongoDB", "Hugging Face", "pdf.js", "AWS S3", "Railway", "Netlify"],
    description: [
      "Built an AI-powered study platform for UPSC aspirants using Hugging Face for text summarization with 90% accuracy.",
      "Integrated Google OAuth for secure login and role-based access control.",
      "Designed a custom PDF viewer via pdf.js, hosting 20+ eBooks through AWS S3.",
      "Deployed using Railway and Netlify, ensuring sub-300ms API responses."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/UPSCpath.git",
    liveLink: "https://upscpath.netlify.app/"
  },
  {
    id: 2,
    title: "SafeChat",
    category: "Web",
    timeline: "March 2025 - Present",
    techStack: ["React.js", "CSS", "Axios", "AWS (IAM, Rekognition, S3)", "Netlify", "Render.com"],
    description: [
      "Built a privacy-focused chat app with React.js and custom CSS for 100% responsiveness.",
      "Added facial authentication via AWS Rekognition, cutting unauthorized access by 95%.",
      "Optimized components, reducing load times by 40%.",
      "Deployed on Netlify and Render.com with AWS S3 for 99.8% uptime."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/safe-chat",
  },
  {
    id: 3,
    title: "Kartikey Care - OPD Ticket Booking",
    category: "Web",
    timeline: "Feb 2025 - Present",
    techStack: ["React.js", "CSS", "Node.js", "MongoDB", "AWS Lambda"],
    description: [
      "Designed a responsive UI with React.js and CSS, achieving 95+ Lighthouse scores.",
      "Developed a booking system with real-time updates, improving UX by 40%.",
      "Integrated qrcode.js for O(1) QR generation.",
      "Exploring AWS CloudFront for sub-millisecond response times."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/kartikeycare",
  },
  {
    id: 4,
    title: "Microservices Calculator",
    category: "Cloud",
    timeline: "Jan 2025 - Feb 2025",
    techStack: ["React.js", "API Gateway", "AWS CloudFront", "Railway"],
    description: [
      "Built an interactive calculator UI with React.js and Material UI.",
      "Integrated serverless microservices, reducing backend load by 60%.",
      "Optimized rendering with code-splitting, achieving sub-1s load times.",
      "Deployed on AWS S3 & CloudFront for 99.9% uptime."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/frontend-calculator",
  },
  {
    id: 5,
    title: "Landslide Prediction System",
    category: "AI",
    timeline: "Aug 2024 - Oct 2024",
    techStack: ["Flask", "React.js", "Python", "AWS Lambda", "EC2", "SNS"],
    description: [
      "Developed a landslide prediction dashboard with real-time visualization.",
      "Achieved 86.93% accuracy using Random Forest with Optuna tuning.",
      "Integrated AWS SNS for instant alerts, reducing response time by 45%.",
      "Designed a mobile-responsive UI."
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
      "Explores AI and edge computing for railway maintenance, using differential privacy and model pruning for secure, efficient deployment.",
    githubLink: "https://github.com/Kartikeyy-pandeyy/AI-Driven-Predictive-Maintenance",
  },
  {
    id: 2,
    title: "Performance Analysis of Docker Containers & VMs",
    conference: "NGISE 2025 (Accepted)",
    description:
      "Compares Docker containers and VMs, highlighting containers' performance for cloud-native apps and VMs' isolation for heavy workloads.",
    githubLink: "https://github.com/Kartikeyy-pandeyy/performance-analysis",
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Projects");

  return (
    <section className="projects-research">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        Projects & Research
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Explore my best projects and research publications.
      </motion.p>

      <motion.div
        className="tabs"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {["Projects", "Research"].map((tab) => (
          <motion.button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      <div className="content">
        {activeTab === "Projects" ? (
          <div className="projects-grid">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: project.id * 0.05 }}
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
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                >
                  <FaGithub /> GitHub
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="research-grid">
            {researchData.map((paper) => (
              <motion.div
                key={paper.id}
                className="research-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: paper.id * 0.05 }}
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
                  <FaGithub /> GitHub
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;