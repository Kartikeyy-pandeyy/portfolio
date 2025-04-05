import React from "react";
import "../styles/AboutMe.css";
import { FaReact, FaGamepad, FaMusic, FaGlobe, FaRobot, FaLaptopCode, FaJava, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaCamera, FaCloud, FaEye, FaCode } from "react-icons/fa";
import { SiMongodb, SiPostman,  SiAmazonec2, SiAmazons3, SiAwslambda, SiAmazoniam, SiAwsamplify, SiAmazonapigateway, SiNetlify, SiRender } from "react-icons/si";
import { motion } from "framer-motion";

const techStack = [
  { name: "Java", icon: <FaJava className="icon java" />, desc: "Core language for DSA and OOPs." },
  { name: "HTML", icon: <FaHtml5 className="icon html" />, desc: "Foundation for structuring responsive and semantic web pages." },
  { name: "CSS", icon: <FaCss3Alt className="icon css" />, desc: "Expertise in crafting responsive and visually appealing designs." },
  { name: "JavaScript", icon: <FaJs className="icon js" />, desc: "Dynamic scripting for interactive and functional web applications." },
  { name: "React", icon: <FaReact className="icon react" />, desc: "Built reusable components for scalable and interactive UIs." },
  { name: "MongoDB", icon: <SiMongodb className="icon mongo" />, desc: "NoSQL database for flexible and scalable data storage." },
  { name: "REST API", icon: <FaCode className="icon rest" />, desc: "Designed projects for seamless backend-frontend communication." },
  { name: "Postman", icon: <SiPostman className="icon postman" />, desc: "Streamlined API testing and debugging for robust integrations." },
  { name: "SQL", icon: <FaDatabase className="icon sql" />, desc: "Managed relational databases with optimized query performance." },
  { name: "EC2", icon: <SiAmazonec2 className="icon ec2" />, desc: "Hosted scalable backends with auto-scaling and load balancing." },
  { name: "S3", icon: <SiAmazons3 className="icon s3" />, desc: "Stored static assets securely for efficient content delivery." },
  { name: "Lambda", icon: <SiAwslambda className="icon lambda" />, desc: "Implemented serverless functions for cost-effective processing." },
  { name: "IAM", icon: <SiAmazoniam className="icon iam" />, desc: "Secured AWS resources with role-based access control policies." },
  { name: "Amplify", icon: <SiAwsamplify className="icon amplify" />, desc: "Simplified frontend hosting with integrated CI/CD pipelines." },
  { name: "API Gateway", icon: <SiAmazonapigateway className="icon apigateway" />, desc: "Managed scalable APIs for AWS-integrated project workflows." },
  { name: "Axios", icon: <FaCloud className="icon axios" />, desc: "Facilitated secure HTTP requests for API-driven applications." },
  { name: "Rekognition", icon: <FaEye className="icon rekognition" />, desc: "Enabled facial recognition for enhanced security." },
  { name: "Netlify", icon: <SiNetlify className="icon netlify" />, desc: "Deployed frontends with CI/CD for rapid iteration cycles." },
  { name: "Render.com", icon: <SiRender className="icon render" />, desc: "Hosted backends with free-tier scalability and ease." },
];

const hobbies = [
  { name: "Gaming", icon: <FaGamepad className="icon gaming" />, desc: "Enjoy strategy and FPS games for tactical challenges." },
  { name: "Music", icon: <FaMusic className="icon music" />, desc: "Explore Indian music and diverse genres passionately." },
  { name: "Traveling", icon: <FaLaptopCode className="icon traveling" />, desc: "Seek inspiration from mountains and cultural experiences." },
  { name: "Coding", icon: <FaRobot className="icon coding" />, desc: "Build innovative software solutions with enthusiasm." },
  { name: "AI & ML", icon: <FaCamera className="icon aiml" />, desc: "Dive into generative AI and its applications." },
  { name: "Photography", icon: <FaGlobe className="icon photography" />, desc: "Love capturing stunning landscapes." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.175, ease: "easeOut" } // 2x faster: delay 0.08 -> 0.04, duration 0.35 -> 0.175
  }),
  hover: {
    scale: 1.05,
    y: -8,
    zIndex: 10,
    transition: { duration: 0.125, ease: "easeOut" } // 2x faster: duration 0.25 -> 0.125
  }
};

const innerCardVariants = {
  hover: {
    scale: 1.08,
    transition: { duration: 0.125, ease: "easeOut" } // 2x faster: duration 0.25 -> 0.125
  }
};

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-particles">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{ "--direction-x": Math.random() * 2 - 1, "--direction-y": Math.random() * 2 - 1 }}
          />
        ))}
      </div>
      <div className="about-content">
        <motion.p
          className="about-bio"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }} // 2x faster: duration 0.5 -> 0.25
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
              <motion.div
                className="inner-card"
                variants={innerCardVariants}
              >
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
              <motion.div
                className="inner-card"
                variants={innerCardVariants}
              >
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