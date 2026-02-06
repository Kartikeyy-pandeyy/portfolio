import React, { useState, useMemo, useCallback } from "react";
import "../styles/ExperienceEducation.css";
import { FaServer } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import portfolioData from "../assets/v1Content.json";

const timelineIconMap = {
  server: FaServer,
};

const ExperienceEducation = () => {
  const { experienceEducation } = portfolioData;
  const [expanded, setExpanded] = useState(null);

  const handleItemClick = useCallback((index) => {
    setExpanded((prev) => (prev === index ? null : index));
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            "--direction-x": Math.random() * 2 - 1,
            "--direction-y": Math.random() * 2 - 1,
            "--delay": `${Math.random() * 3}s`,
          }}
        />
      )),
    []
  );

  const getElementStyles = useCallback(
    (index) => ({
      contentStyle: {
        background: "transparent",
        color: "#EAEAEA",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 255, 255, 0.1)",
        border:
          index % 2 === 0
            ? "1px solid rgba(0, 255, 255, 0.2)"
            : "1px solid rgba(138, 43, 226, 0.2)",
        padding: "1rem",
      },
      contentArrowStyle: {
        borderRight:
          index % 2 === 0
            ? "8px solid rgba(0, 255, 255, 0.4)"
            : "8px solid rgba(138, 43, 226, 0.4)",
      },
      iconStyle: {
        background:
          index % 2 === 0
            ? "linear-gradient(135deg, #00FFFF, #8A2BE2)"
            : "linear-gradient(135deg, #8A2BE2, #00FFFF)",
        color: "#fff",
        boxShadow: "0 0 6px rgba(0, 255, 255, 0.3)",
      },
    }),
    []
  );

  return (
    <section className="experience-education">
      <div className="timeline-particles">{particles}</div>
      <VerticalTimeline lineColor="transparent">
        {experienceEducation.timeline.map((item, index) => {
          const styles = getElementStyles(index);
          const TimelineIcon = timelineIconMap[item.iconKey] || FaServer;

          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.015,
                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
              }}
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <VerticalTimelineElement
                date={item.date}
                icon={<TimelineIcon />}
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
                    <span className="extra-info">
                      {experienceEducation.expandedSuffix}
                    </span>
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
