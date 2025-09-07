import React, { useState, useMemo, useCallback } from "react";
import "../styles/ExperienceEducation.css";
import { FaSchool, FaUniversity, FaBaby, FaGraduationCap, FaServer } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const timelineData = [
  {
    date: "2003",
    title: "Birth",
    description: "The beginning of my journey.",
    icon: <FaBaby />,
  },
  {
    date: "2007",
    title: "Early Education – St. Joseph's School, Gorakhpur",
    description: "Commenced my academic journey at St. Joseph's School, where I studied until the 5th standard.",
    icon: <FaSchool />,
  },
  {
    date: "2014",
    title: "Secondary Education – GN National Public School",
    description: "Transitioned to GN National Public School for higher studies, completing my education up to the 10th standard.",
    icon: <FaSchool />,
  },
  {
    date: "2019",
    title: "Senior Secondary Education – Academic Global School",
    description: "Pursued my 11th and 12th standard at Academic Global School, focusing on foundational subjects for my future academic path.",
    icon: <FaGraduationCap />,
  },
  {
    date: "2022",
    title: "Undergraduate Studies – Bennett University",
    description: "Enrolled in Bennett University to pursue a B.Tech in Computer Science Engineering with a specialization in Cloud Computing.",
    icon: <FaUniversity />,
  },
  {
    date: "2025",
    title: "SDE DevOps Intern – Hike",
    description: "Joined Hike as an SDE DevOps Intern, contributing to cloud-native deployments, CI/CD pipelines, Kubernetes orchestration, and automation practices.",
    icon: <FaServer />, // you can swap this for another icon if you'd like (e.g., FaLaptopCode)
  },
];

const ExperienceEducation = () => {
  const [expanded, setExpanded] = useState(null);

  // Memoize click handler
  const handleItemClick = useCallback((index) => {
    setExpanded(prev => prev === index ? null : index);
  }, []);

  // Memoize particles
  const particles = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className="particle"
        style={{ 
          '--direction-x': Math.random() * 2 - 1, 
          '--direction-y': Math.random() * 2 - 1,
          '--delay': `${Math.random() * 3}s`
        }}
      />
    )), []
  );

  // Memoize timeline element styles
  const getElementStyles = useCallback((index) => ({
    contentStyle: {
      background: "transparent",
      color: "#EAEAEA",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 255, 255, 0.1)",
      border: index % 2 === 0 
        ? "1px solid rgba(0, 255, 255, 0.2)" 
        : "1px solid rgba(138, 43, 226, 0.2)",
      padding: "1rem",
    },
    contentArrowStyle: {
      borderRight: index % 2 === 0 
        ? "8px solid rgba(0, 255, 255, 0.4)" 
        : "8px solid rgba(138, 43, 226, 0.4)",
    },
    iconStyle: {
      background: index % 2 === 0
        ? "linear-gradient(135deg, #00FFFF, #8A2BE2)"
        : "linear-gradient(135deg, #8A2BE2, #00FFFF)",
      color: "#fff",
      boxShadow: "0 0 6px rgba(0, 255, 255, 0.3)",
    }
  }), []);

  return (
    <section id="experience-education" className="experience-education">
      <div className="timeline-particles">
        {particles}
      </div>
      <VerticalTimeline lineColor="transparent">
        {timelineData.map((item, index) => {
          const styles = getElementStyles(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.015,
                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
              }}
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              transition={{ 
                duration: 0.25, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1] 
              }}
            >
              <VerticalTimelineElement
                date={item.date}
                icon={item.icon}
                position={index % 2 === 0 ? "left" : "right"}
                contentStyle={styles.contentStyle}
                contentArrowStyle={styles.contentArrowStyle}
                iconStyle={styles.iconStyle}
                onClick={() => handleItemClick(index)}
              >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <p className="vertical-timeline-element-description">
                {item.description}
                {expanded === index && (
                  <span className="extra-info"> - More details could be added here!</span>
                )}
              </p>
              </VerticalTimelineElement>
            </motion.div>
          );
        })}
      </VerticalTimeline>
    </section>
  );
};

export default ExperienceEducation;