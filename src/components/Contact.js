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
  { icon: FaInstagram, url: "https://instagram.com/kartikeyypandeyy", label: "Instagram" },
  { icon: FaTelegram, url: "https://t.me/kartikeyypandeyy", label: "Telegram" },
  { icon: FaEnvelope, url: "mailto:kartikeyy.pandeyy@gmail.com", label: "Email" },
];

const Contact = () => {
  const [formStatus, setFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [particleOptions, setParticleOptions] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);
  let submitTimeout = null;

  useEffect(() => {
    const updateParticles = () => {
      const width = window.innerWidth;
      setParticleOptions({
        particles: {
          number: { value: width < 768 ? 30 : 60, density: { enable: true, value_area: 1000 } },
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
      });
    };
    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
    loadSlim(window.tsParticles);
    return () => AOS.refresh();
  }, []);

  // Scroll logic for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Show button only when at the very bottom
      setShowScrollTop(scrollPosition >= documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
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

    clearTimeout(submitTimeout);
    submitTimeout = setTimeout(() => {
      fetch("https://formspree.io/f/mnnpnqkp", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
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
        })
        .catch(() => {
          setIsSubmitting(false);
          setFormStatus("Error sending message.");
        });
    }, 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="particles-wrapper">
        <Particles id="tsparticles" options={particleOptions} />
      </div>
      <div className="content-wrapper">
        <h2 data-aos="fade-up">Get in Touch</h2>
        <p data-aos="fade-up" data-aos-delay="200">Let’s launch something cosmic together!</p>
        <div className="contact-container" data-aos="fade-up" data-aos-delay="400">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
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
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner"></span> : "Send Message"}
            </button>
            <p ref={statusRef} className="form-status" aria-live="polite" role="alert">{formStatus}</p>
          </form>
          <div className="contact-info">
            <div className="social-links">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} Profile`}>
                  <Icon /> <span>{label}</span>
                </a>
              ))}
            </div>
            <a
              href="mailto:kartikeyy.pandeyy@gmail.com?subject=Let's Connect!&body=Hi Kartikey, I’d love to discuss..."
              className="email-btn"
            >
              Drop Me a Cosmic Note!
            </a>
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