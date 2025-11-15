import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aviar from "./Images/aviar.png";
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
    <div
      style={{
        background: "#9eadffff",
        paddingTop: "45px",
        paddingBottom: "25px",
        borderTop: "1px solid #e2e4f4",
      }}
    >
      <Container className="p-4">
        <Row>

          {/* LOGO + ADDRESS */}
          <Col className="mb-3" md={3} sm={6}>
            <div>
              <img
                src={aviar}
                width="45%"
                style={{
                  marginBottom: "15px",
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))",
                }}
                alt="logo"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "12px",
              }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/AVIAR+Technology+Services/",
                  "_blank"
                )
              }
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ marginRight: "8px", color: "#3f51b5" }}
              />
              <span style={{ fontSize: "15px", color: "#333" }}>
                Tiruvannamalai, Tamilnadu
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: "8px", color: "#3f51b5" }}
              />
              <a
                href="mailto:aviartechservices.com"
                style={{
                  textDecoration: "none",
                  color: "#3f51b5",
                  fontSize: "15px",
                }}
              >
                aviartechservices.com
              </a>
            </div>
          </Col>

          {/* EXPLORE */}
          <Col md={3} sm={6} className="mt-2">
            <b style={{ fontSize: "18px", color: "#25306f" }}>Explore</b>
            <br />

            <a
              href="/login"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              Courses
            </a><br />

            <a
              href="/trainers"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              Trainers
            </a><br />

            <a
              href="/about-us"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              About Us
            </a><br />

            <a
              href="/terms-of-use"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              Terms of Use
            </a><br />

            <a
              href="/privacy-policy"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              Privacy Policy
            </a>
          </Col>

          {/* ACCOUNT */}
          <Col md={3} sm={6} className="mt-2">
            <b style={{ fontSize: "18px", color: "#25306f" }}>Account</b>
            <br />
            <a
              href="/login"
              style={linkStyle}
              onMouseOver={(e) => hoverColor(e, "#3f51b5")}
              onMouseOut={(e) => hoverColor(e, "#444")}
            >
              Login
            </a>
          </Col>

          {/* SOCIAL */}
          <Col md={3} sm={6} className="mt-2">
            <b style={{ fontSize: "18px", color: "#25306f" }}>Stay Connected</b>

            <div style={{ marginTop: "10px", }}>
              <a
                href="#facebook"
                style={{ ...linkStyle, display: "flex", alignItems: "center" }}
                onMouseOver={(e) => hoverColor(e, "#3f51b5")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faFacebook} style={{ marginRight: "8px" }} />
                Facebook
              </a>

              <a
                href="#instagram"
                style={{ ...linkStyle, display: "flex", alignItems: "center" }}
                onMouseOver={(e) => hoverColor(e, "#E4405F")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faInstagram} style={{ marginRight: "8px" }} />
                Instagram
              </a>

              <a
                href="#twitter"
                style={{ ...linkStyle, display: "flex", alignItems: "center" }}
                onMouseOver={(e) => hoverColor(e, "#1DA1F2")}
                onMouseOut={(e) => hoverColor(e, "#444")}
              >
                <FontAwesomeIcon icon={faTwitter} style={{ marginRight: "8px" }} />
                Twitter
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ marginTop: "25px", marginBottom: "15px" }} />

        <div
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "14px",
          }}
        >
          © {new Date().getFullYear()} Kharphi Team | Designed by{" "}
          <span
            style={{
              color: "#3f51b5",
              cursor: "pointer",
              textDecoration: "none",
            }}
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
