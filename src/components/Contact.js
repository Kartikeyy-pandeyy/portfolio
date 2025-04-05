import React, { useState, useEffect, useRef } from "react";
import "../styles/Contact.css";
import { FaGithub, FaLinkedin, FaInstagram, FaTelegram, FaEnvelope } from "react-icons/fa";
import Confetti from "react-confetti";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const socialLinks = [
  { icon: FaGithub, url: "https://github.com/Kartikeyy-pandeyy", label: "GitHub" },
  { icon: FaLinkedin, url: "https://linkedin.com/in/kartikeyypandeyy", label: "LinkedIn" },
  { icon: FaInstagram, url: "https://instagram.com/kartikeyy.pandeyy", label: "Instagram" },
  { icon: FaTelegram, url: "https://t.me/kartikeyypandeyy", label: "Telegram" },
  { icon: FaEnvelope, url: "mailto:kartikeyy.pandeyy@gmail.com", label: "Email" },
];

const Contact = () => {
  const [formStatus, setFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const formRef = useRef(null);

  const particleOptions = {
    particles: {
      number: { value: window.innerWidth < 768 ? 40 : 70, density: { enable: true, value_area: 1000 } }, // 40 mobile, 70 laptop
      color: { value: ["#00FFFF", "#8A2BE2"] }, // Simplified colors
      shape: { type: "circle" }, // Faster than star
      opacity: { value: 0.7, random: { enable: true, minimumValue: 0.4 } },
      size: { value: 1.5, random: { enable: true, minimumValue: 0.5 } },
      move: { enable: true, speed: 0.4, direction: "none", random: true, outModes: "out" }, // Autonomous movement
    },
    interactivity: {
      events: {}, // Removed all interactivity
    },
    background: { color: "transparent" },
  };

  useEffect(() => {
    AOS.init({ duration: 600, once: true }); // Faster AOS
    loadSlim(window.tsParticles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormErrors({ email: "Invalid email" });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    setFormStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/mnnpnqkp", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      setIsSubmitting(false);
      if (response.ok) {
        setFormStatus("Sent!");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        e.target.reset();
      } else {
        setFormStatus("Error!");
      }
    } catch {
      setIsSubmitting(false);
      setFormStatus("Error!");
    }
  };

  return (
    <section className="contact" id="contact">
      <Particles id="tsparticles" options={particleOptions} className="particles-wrapper" />
      <div className="content-wrapper">
        <h2 data-aos="fade-up">Get in Touch</h2>
        <p data-aos="fade-up" data-aos-delay="100">Let’s launch something cosmic together!</p>
        <div className="contact-container" data-aos="fade-up" data-aos-delay="200">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-card contact-form">
            <div className="form-fields">
              <div className="form-field">
                <input type="text" name="name" placeholder="Your Name" required aria-label="Your Name" />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  aria-label="Your Email"
                  aria-describedby="email-error"
                />
                {formErrors.email && <span id="email-error" className="error">{formErrors.email}</span>}
              </div>
              <div className="form-field">
                <textarea name="message" placeholder="Your Message" rows="5" required aria-label="Your Message" />
              </div>
            </div>
            <div className="card-actions">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner" /> : "Send Message"}
              </button>
              <p className="form-status" aria-live="polite">{formStatus}</p>
            </div>
          </form>
          <div className="contact-card contact-info">
            <div className="social-links">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} Profile`}>
                  <Icon /> <span>{label}</span>
                </a>
              ))}
            </div>
            <div className="card-actions">
              <a
                href="mailto:kartikeyy.pandeyy@gmail.com?subject=Let's Connect!&body=Hi Kartikey, I’d love to discuss..."
                className="email-btn"
              >
                Drop a note
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