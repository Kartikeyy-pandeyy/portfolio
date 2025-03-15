import React, { useState } from "react";
import "../styles/ExperienceEducation.css";
import { FaSchool, FaUniversity, FaBaby, FaGraduationCap } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion, useScroll, useTransform } from "framer-motion";

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
];


const ExperienceEducation = () => {
  const [expanded, setExpanded] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]); // Subtle scale for performance

  return (
    <motion.section
      id="experience-education"
      className="experience-education"
      style={{ opacity, scale }}
    >
      <div className="timeline-particles">
        {Array.from({ length: 6 }).map((_, i) => ( // Reduced particles for performance
          <span
            key={i}
            className="particle"
            style={{ '--direction-x': Math.random() * 2 - 1, '--direction-y': Math.random() * 2 - 1 }}
          />
        ))}
      </div>
      <VerticalTimeline lineColor="transparent">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }} // Reduced y offset for faster animation
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }} // Faster and snappier
          >
            <VerticalTimelineElement
              date={item.date}
              icon={item.icon}
              position={index % 2 === 0 ? "left" : "right"}
              contentStyle={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))",
                color: "#EAEAEA",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0, 255, 255, 0.2)", // Slightly reduced shadow
                backdropFilter: "blur(12px)", // Reduced blur for performance
                border: index % 2 === 0 ? "1px solid rgba(0, 255, 255, 0.3)" : "1px solid rgba(138, 43, 226, 0.3)",
              }}
              contentArrowStyle={{
                borderRight: index % 2 === 0 ? "10px solid rgba(0, 255, 255, 0.5)" : "10px solid rgba(138, 43, 226, 0.5)",
              }}
              iconStyle={{
                background: index % 2 === 0
                  ? "linear-gradient(135deg, #00FFFF, #8A2BE2)"
                  : "linear-gradient(135deg, #8A2BE2, #00FFFF)",
                color: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition moved to CSS
              }}
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <p className="vertical-timeline-element-description">
                {item.description}
                {expanded === index && (
                  <span className="extra-info">
                    {" "} - More details could be added here!
                  </span>
                )}
              </p>
            </VerticalTimelineElement>
          </motion.div>
        ))}
      </VerticalTimeline>
    </motion.section>
  );
};

export default ExperienceEducation;