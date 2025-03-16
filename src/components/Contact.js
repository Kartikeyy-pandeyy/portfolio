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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const particleOptions = {
    particles: {
      number: { value: window.innerWidth < 768 ? 30 : 60, density: { enable: true, value_area: 1000 } },
      color: { value: ["#FFFFFF", "#E0E0E0", "#D0D0D0"] },
      shape: { type: "star" },
      opacity: { value: 0.8, random: { enable: true, minimumValue: 0.4 } },
      size: { value: 1.5, random: { enable: true, minimumValue: 0.5 } },
      move: { enable: true, speed: 0.5, direction: "none", random: true },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 80 }, push: { quantity: 3 } },
    },
    background: { color: "transparent" },
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // 'once' prevents re-animation on scroll
    loadSlim(window.tsParticles);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); // Passive for performance
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormErrors({ email: "Invalid email format" });
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
        setFormStatus("Message Sent!");
        setShowConfetti(true);
        setShowSuccessModal(true);
        setTimeout(() => setShowConfetti(false), 3000);
        e.target.reset();
        statusRef.current?.focus();
      } else {
        setFormStatus("Error sending message.");
      }
    } catch {
      setIsSubmitting(false);
      setFormStatus("Error sending message.");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="contact" id="contact">
      <Particles id="tsparticles" options={particleOptions} className="particles-wrapper" />
      <div className="content-wrapper">
        <h2 data-aos="fade-up">Get in Touch</h2>
        <p data-aos="fade-up" data-aos-delay="200">Let’s launch something cosmic together!</p>
        <div className="contact-container" data-aos="fade-up" data-aos-delay="400">
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
              <p ref={statusRef} className="form-status" aria-live="polite" role="alert">{formStatus}</p>
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
                Drop Me a Cosmic Note!
              </a>
            </div>
          </div>
        </div>
      </div>
      {showConfetti && <Confetti numberOfPieces={100} colors={["#00FFFF", "#8A2BE2", "#FF69B4"]} />}
      {showSuccessModal && (
        <div className="success-modal">
          <p>Message Sent Successfully!</p>
          <button onClick={() => setShowSuccessModal(false)}>Close</button>
        </div>
      )}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </section>
  );
};

export default Contact;