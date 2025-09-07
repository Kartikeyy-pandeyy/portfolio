import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "../styles/Projects.css";
import { FaBookOpen, FaGithub, FaRocket } from "react-icons/fa";

const projectsData = [
   {
    id: 1,
    title: "GitShowcaseAPI",
    category: "Web / API",
    timeline: "Aug 2025 - Present",
    techStack: ["AWS", "HTML", "REST API", "Github", "CSS"],
    description: [
      "Built a REST API that aggregates GitHub data to generate showcase-ready profiles.",
      "Implements clean endpoints for repos, languages, and pinned projects.",
      "Adds caching and pagination for fast responses and scalable queries.",
      "Containerized with Docker for reproducible local and cloud deploys."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/GitShowcaseAPI",
    liveLink: "https://d3tbtv7bxs3vbw.cloudfront.net/",
  },
  {
    id: 2,
    title: "API Monitor",
    category: "DevTools / Observability",
    timeline: "Aug 2025 - Present",
    techStack: ["Jenkins", "AWS", "Axios", "S3", "HTML", "CSS", "Docker"],
    description: [
      "Monitors endpoint uptime/latency with scheduled health checks.",
      "Persists historical results for trend analysis and quick triage.",
      "Supports configurable targets and notification hooks.",
      "Dockerized for easy deployment to any environment."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/api-monitor",
    liveLink: "https://apimonitor.netlify.app/",
  },
  {
  id: 3,
  title: "UPSCPath",
  category: "AI/EdTech",
  timeline: "March 2025 - Present",
  techStack: ["React.js", "Node.js", "MongoDB", "Hugging Face", "AWS S3"],
  description: [
    "AI-powered study platform for UPSC aspirants with Hugging Face summarization (~90% accuracy).",
    "Google OAuth for secure login with access control.",
    "Custom PDF viewer hosting eBooks through S3.",
    "Deployed on Railway & Netlify with sub-300ms API responses."
  ],
  githubLink: "https://github.com/Kartikeyy-pandeyy/UPSCpath.git",
  liveLink: "https://upscpath.netlify.app/"
}
,
  {
    id: 4,
    title: "SafeChat",
    category: "Web",
    timeline: "March 2025 - Present",
    techStack: ["React.js","Node.js", "CSS", "Rekognition"],
    description: [
      "Built a privacy-focused chat app with React.js and custom CSS for 100% responsiveness.",
      "Added facial authentication via AWS Rekognition, cutting unauthorized access by 95%.",
      "Optimized components, reducing load times.",
      "Deployed on Netlify and Render.com with AWS S3."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/safe-chat",
    liveLink: "https://safechatapp.netlify.app/"
  },
  {
    id: 5,
    title: "Kartikey Care",
    category: "Web",
    timeline: "Feb 2025 - Present",
    techStack: ["React.js", "CSS", "Node.js", "MongoDB"],
    description: [
      "Designed a responsive UI with React.js and CSS, achieving 95+ Lighthouse scores.",
      "Developed a booking system with real-time updates, improving UX by 40%.",
      "Integrated qrcode.js for O(1) QR generation.",
      "Exploring AWS CloudFront for sub-millisecond response times."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/kartikeycare",
    liveLink: "https://kartikeycare.vercel.app/"
  },
  {
    id: 6,
    title: "Microservices Calculator",
    category: "Cloud",
    timeline: "Jan 2025 - Feb 2025",
    techStack: ["React.js", "AWS CloudFront", "Railway"],
    description: [
      "Built an interactive calculator UI with React.js and Material UI.",
      "Integrated serverless microservices, reducing backend load by 60%.",
      "Optimized rendering with code-splitting, achieving sub-1s load times.",
      "Deployed on AWS S3 & CloudFront for 99.9% uptime."
    ],
    githubLink: "https://github.com/Kartikeyy-pandeyy/frontend-calculator",
    liveLink: "https://heythereareyouokay.netlify.app/calculator"
  },
  {
    id: 7,
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
    liveLink: "https://heythereareyouokay.netlify.app/landslideprediction"
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
        {activeTab === "Projects" ? (
          <div className="projects-grid">
            {projectsData.map((project, index) => (
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
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-button"
                  >
                    <FaRocket /> Go Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="research-grid">
            {researchData.map((paper, index) => (
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
                  <FaGithub /> GitHub
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
