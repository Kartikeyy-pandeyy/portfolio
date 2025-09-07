import React, { useMemo } from "react";
import "../styles/AboutMe.css";
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

const techStack = [
  { name: "Java",       icon: <FaJava className="icon java" />,          desc: "Core language for DSA, OOP, and backend service design." },
  { name: "MongoDB",    icon: <SiMongodb className="icon mongo" />,      desc: "NoSQL document store for flexible and scalable data." },
  { name: "MySQL",      icon: <SiMysql className="icon mysql" />,        desc: "Relational database with tuned indexes and queries." },
  { name: "REST API",   icon: <FaCode className="icon rest" />,          desc: "Clean endpoints with auth, versioning, and testing." },
  { name: "AWS",        icon: <SiAmazonwebservices className="icon aws" />,      desc: "Cloud primitives for compute, storage, and security." },
  { name: "GCP",        icon: <SiGooglecloud className="icon gcp" />,    desc: "Managed services for scalable, cost-aware workloads." },
  { name: "Docker",     icon: <SiDocker className="icon docker" />,      desc: "Containerized builds with layered, reproducible images." },
  { name: "Kubernetes", icon: <SiKubernetes className="icon k8s" />,     desc: "Declarative deploys, services, and autoscaling on k8s." },
  { name: "Jenkins",    icon: <SiJenkins className="icon jenkins" />,    desc: "CI/CD pipelines with secrets, agents, and caching." },
  { name: "Helm",       icon: <SiHelm className="icon helm" />,          desc: "Charts and values to templatize Kubernetes releases." },
];

const hobbies = [
  { name: "Music",        icon: <FaMusic className="icon music" />,        desc: "Explore Indian music and diverse genres passionately." },
  { name: "Gaming",       icon: <FaGamepad className="icon gaming" />,     desc: "Enjoy strategy and FPS games for tactical challenges." },
  { name: "Traveling",    icon: <FaGlobe className="icon traveling" />,    desc: "Seek inspiration from mountains and cultural experiences." },
  { name: "Photography",  icon: <FaCamera className="icon photography" />, desc: "Love capturing vibrant vistas and candid moments." },
  { name: "Tech & Phones",icon: <FaMobileAlt className="icon tech" />,     desc: "I read about smartphones, chips, and gadget ecosystems." },
  { name: "Worldview",    icon: <FaBookOpen className="icon curious" />,   desc: "Love listening, learning how the world works overall." },
];

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
          Turning coffee into code, dreams into deployments, and bugs into 'features.' Passionate about cloud, AI, and full-stack magic!
        </motion.p>

        <h3 className="section-title">Tools That Shape My Code</h3>
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="card tech-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              <motion.div className="inner-card" variants={innerCardVariants}>
                {tech.icon}
              </motion.div>
              <div className="card-content">
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="section-title">Things I Love Doing</h3>
        <div className="hobby-container">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              className="card hobby-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              <motion.div className="inner-card" variants={innerCardVariants}>
                {hobby.icon}
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
