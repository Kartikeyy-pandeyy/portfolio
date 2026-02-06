import React, { useState, useEffect, useRef } from "react";
import "../styles/Contact.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";
import Confetti from "react-confetti";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import portfolioData from "../assets/v1Content.json";

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  telegram: FaTelegram,
  email: FaEnvelope,
};

const Contact = () => {
  const { contact } = portfolioData;
  const [formStatus, setFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const formRef = useRef(null);

  const particleOptions = {
    particles: {
      number: {
        value: window.innerWidth < 768 ? 40 : 70,
        density: { enable: true, value_area: 1000 },
      },
      color: { value: ["#00FFFF", "#8A2BE2"] },
      shape: { type: "circle" },
      opacity: { value: 0.7, random: { enable: true, minimumValue: 0.4 } },
      size: { value: 1.5, random: { enable: true, minimumValue: 0.5 } },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        outModes: "out",
      },
    },
    interactivity: {
      events: {},
    },
    background: { color: "transparent" },
  };

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    loadSlim(window.tsParticles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormErrors({ email: contact.emailValidationError });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setFormStatus(contact.sendingStatus);

    try {
      const response = await fetch(contact.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      setIsSubmitting(false);
      if (response.ok) {
        setFormStatus(contact.successStatus);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        e.target.reset();
      } else {
        setFormStatus(contact.errorStatus);
      }
    } catch {
      setIsSubmitting(false);
      setFormStatus(contact.errorStatus);
    }
  };

  return (
    <section className="contact" id="contact">
      <Particles
        id="tsparticles"
        options={particleOptions}
        className="particles-wrapper"
      />
      <div className="content-wrapper">
        <h2 data-aos="fade-up">{contact.title}</h2>
        <p data-aos="fade-up" data-aos-delay="100">
          {contact.subtitle}
        </p>
        <div className="contact-container" data-aos="fade-up" data-aos-delay="200">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-card contact-form"
          >
            <div className="form-fields">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder={contact.namePlaceholder}
                  required
                  aria-label={contact.namePlaceholder}
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder={contact.emailPlaceholder}
                  required
                  aria-label={contact.emailPlaceholder}
                  aria-describedby="email-error"
                />
                {formErrors.email && (
                  <span id="email-error" className="error">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  placeholder={contact.messagePlaceholder}
                  rows="5"
                  required
                  aria-label={contact.messagePlaceholder}
                />
              </div>
            </div>
            <div className="card-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner" /> : contact.submitButtonText}
              </button>
              <p className="form-status" aria-live="polite">
                {formStatus}
              </p>
            </div>
          </form>
          <div className="contact-card contact-info">
            <div className="social-links">
              {contact.socialLinks.map(({ iconKey, url, label }) => {
                const Icon = socialIconMap[iconKey];
                if (!Icon) return null;

                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} Profile`}
                  >
                    <Icon /> <span>{label}</span>
                  </a>
                );
              })}
            </div>
            <div className="card-actions">
              <a href={contact.emailButtonHref} className="email-btn">
                {contact.emailButtonText}
              </a>
            </div>
          </div>
        </div>
      </div>
      {showConfetti && <Confetti numberOfPieces={500} colors={["#00FFFF", "#8A2BE2"]} />}
    </section>
  );
};

export default Contact;
