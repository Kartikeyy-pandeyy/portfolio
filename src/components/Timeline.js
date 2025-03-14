import React from 'react';
import '../styles/Timeline.css'; // Styling for the timeline

const timelineData = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    company: 'Tech Corp',
    date: 'Jan 2024 - Present',
    description: 'Worked on cloud solutions and developed scalable microservices.',
    category: 'Experience'
  },
  {
    id: 2,
    title: 'Bachelor of Technology - CSE',
    company: 'Bennett University',
    date: '2021 - 2025',
    description: 'Specialization in Cloud Computing.',
    category: 'Education'
  },
  {
    id: 3,
    title: 'Landslide Prediction System',
    company: 'Project',
    date: '2023',
    description: 'Developed an AI-based landslide prediction system using ML models.',
    category: 'Project'
  }
];

const Timeline = () => {
  return (
    <div className="timeline-container">
      {timelineData.map((item, index) => (
        <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="content">
            <h3>{item.title}</h3>
            <h4>{item.company}</h4>
            <span className="date">{item.date}</span>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
