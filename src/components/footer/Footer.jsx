import React from "react";
import "./footer.css"; // Ensure you have a CSS file for styling
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your E-Learning Platform. All rights
          reserved.
        </p>
        <div className="social-links">
          <a
            href="https://www.facebook.com/profile.php?id=61566500106230"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/e_education_with_ddit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/e-learning-6a1872330/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
