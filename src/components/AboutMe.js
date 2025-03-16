import React from "react";
import "../styles/AboutMe.css";
import { FaReact, FaGamepad, FaMusic, FaGlobe, FaLaptopCode, FaRobot, FaJava, FaHtml5, FaCss3Alt, FaJs, FaServer, FaDatabase, FaCamera } from "react-icons/fa";
import { SiMongodb, SiPostman, SiFlask, SiAmazonec2, SiAmazons3, SiAmazonwebservices, SiAwslambda, SiAmazoniam, SiAwsamplify, SiAmazonapigateway } from "react-icons/si";
import { motion } from "framer-motion";

const techStack = [
  { 
    name: "Java", 
    icon: <FaJava className="icon java" />, 
    desc: "Primary language. Practiced DSA and OOP concepts." 
  },
  { 
    name: "HTML", 
    icon: <FaHtml5 className="icon html" />, 
    desc: "Started in school. Comfortable with structuring web pages." 
  },
  { 
    name: "CSS", 
    icon: <FaCss3Alt className="icon css" />, 
    desc: "Learned early. Familiar with styling and responsiveness." 
  },
  { 
    name: "JavaScript", 
    icon: <FaJs className="icon js" />, 
    desc: "Picked up while building projects. Still improving." 
  },
  { 
    name: "React", 
    icon: <FaReact className="icon react" />, 
    desc: "Average skills. Learning while building applications." 
  },
  { 
    name: "MongoDB", 
    icon: <SiMongodb className="icon mongo" />, 
    desc: "My go-to database for projects." 
  },
  { 
    name: "REST API", 
    icon: <FaServer className="icon rest" />, 
    desc: "Learned while working on a microservice-based project." 
  },
  { 
    name: "Postman", 
    icon: <SiPostman className="icon postman" />, 
    desc: "I Use it for API testing and debugging." 
  },
  { 
    name: "Flask", 
    icon: <SiFlask className="icon flask" />, 
    desc: "I Build a project connecting a hybrid ML model to frontend." 
  },
  { 
    name: "SQL", 
    icon: <FaDatabase className="icon sql" />, 
    desc: "Okayish at it, Familiar with relational databases." 
  },
  { 
    name: "EC2", 
    icon: <SiAmazonec2 className="icon ec2" />, 
    desc: "Used for backend hosting. Familiar with ASG & LB." 
  },
  { 
    name: "S3", 
    icon: <SiAmazons3 className="icon s3" />, 
    desc: "Go to Cloud storage for my AWS projects." 
  },
  { 
    name: "CloudFront", 
    icon: <SiAmazonwebservices className="icon cloudfront" />, 
    desc: "I Use it for sub-millisecond content delivery." 
  },
  { 
    name: "Lambda", 
    icon: <SiAwslambda className="icon lambda" />, 
    desc: "Familiar with ARN, layers, and triggers." 
  },
  { 
    name: "IAM", 
    icon: <SiAmazoniam className="icon iam" />, 
    desc: "Well-versed in IAM roles, policies, and secure user management." 
  },
  { 
    name: "Amplify", 
    icon: <SiAwsamplify className="icon amplify" />, 
    desc: "I Prefer hosting here for ease of deployment." 
  },
  { 
    name: "API Gateway", 
    icon: <SiAmazonapigateway className="icon apigateway" />, 
    desc: "Use it for AWS-based projects." 
  },
];

const hobbies = [
  { 
    name: "Gaming", 
    icon: <FaGamepad className="icon gaming" />, 
    desc: "Love strategy and FPS games like Valorant." 
  },
  { 
    name: "Music", 
    icon: <FaMusic className="icon music" />, 
    desc: "Love Indian music and exploring new genres." 
  },
  { 
    name: "Traveling", 
    icon: <FaGlobe className="icon traveling" />, 
    desc: "Mountains and new cultures inspire me." 
  },
  { 
    name: "Coding", 
    icon: <FaLaptopCode className="icon coding" />, 
    desc: "Love building software that solves problems." 
  },
  { 
    name: "AI & ML", 
    icon: <FaRobot className="icon aiml" />, 
    desc: "Generative AI and its uses excite me." 
  },
  { 
    name: "Photography", 
    icon: <FaCamera className="icon photography" />, 
    desc: "Love capturing landscapes and moments." 
  },
];



const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  }),
};

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-glass"></div>
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Turning coffee into code, dreams into deployments, and bugs into 'features.' Passionate about cloud, AI, and full-stack magic!
        </motion.p>

        <h3 className="section-title exp">Tools That Shape My Code</h3>
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              {tech.icon}
              <h4>{tech.name}</h4>
              <p>{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="section-title">Things I Love Doing</h3>
        <div className="hobby-container">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              className="hobby-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              {hobby.icon}
              <h4>{hobby.name}</h4>
              <p>{hobby.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;