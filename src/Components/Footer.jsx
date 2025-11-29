import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aviar from "./Images/aviar.png";
import '../css/Footer.css'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#444",
    fontSize: "15px",
    transition: "0.2s",
    display: "inline-block",
    marginTop: "6px",
  };

  const hoverColor = (e, color) => {
    e.target.style.color = color;
  };

  return (
    <div className="footer-container">
      <Container className="p-4">
        <Row>
          {/* LOGO + ADDRESS */}
          <Col className="mb-3 footer-col" md={3} sm={6}>
            <div className="logo-section">
              <img
                src={aviar}
                className="footer-logo"
                alt="Aviar Technology Services logo"
              />
            </div>

            <div
              className="location-item"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/AVIAR+Technology+Services/",
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                className="location-icon"
              />
              <span className="location-text">
                Tiruvannamalai, Tamilnadu
              </span>
            </div>

            <div className="email-item">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="email-icon"
              />
              <a
                href="mailto:aviartechservices.com"
                className="email-link"
              >
                aviartechservices.com
              </a>
            </div>
          </Col>

          {/* EXPLORE */}
          <Col md={3} sm={6} className="mt-2 footer-col">
            <b className="footer-section-title">Explore</b>
            <div className="footer-links">
              <a
                href="/courses"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                Courses
              </a>
              <a
                href="/trainers"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                Trainers
              </a>
              <a
                href="/about-us"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                About Us
              </a>
              <a
                href="/terms-of-use"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                Terms of Use
              </a>
              <a
                href="/privacy-policy"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                Privacy Policy
              </a>
            </div>
          </Col>

          {/* ACCOUNT */}
          <Col md={3} sm={6} className="mt-2 footer-col">
            <b className="footer-section-title">Account</b>
            <div className="footer-links">
              <a
                href="/login"
                style={linkStyle}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                Login
              </a>
            </div>
          </Col>

          {/* SOCIAL */}
          <Col md={3} sm={6} className="mt-2 footer-col">
            <b className="footer-section-title">Stay Connected</b>
            <div className="social-links">
              <a
                href="#facebook"
                className="social-link facebook-link"
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                Facebook
              </a>

              <a
                href="#instagram"
                className="social-link instagram-link"
                onMouseOver={(e) => hoverColor(e, "#E4405F")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                Instagram
              </a>

              <a
                href="#twitter"
                className="social-link twitter-link"
                onMouseOver={(e) => hoverColor(e, "#1DA1F2")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                Twitter
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="copyright-section">
          © {new Date().getFullYear()} Kharphi Team | Designed by{" "}
          <span
            className="company-link"
            onClick={() => window.open("https://aviartechservices.com/")}
          >
            Aviar Technology Services
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;