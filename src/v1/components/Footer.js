import React from "react";
import "../styles/Footer.css";
import portfolioData from "../assets/v1Content.json";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-name">{portfolioData.profile.footerName}</span>
      </div>
    </footer>
  );
};

export default Footer;
