import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import aviar from "../Images/aviar.png";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
export default function DefaultFooter(props) {
  const login = props?.sidebar;
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const [studentId, setStudentId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const role = localStorage.getItem("role");
    setRole(role);
    const studentId = localStorage.getItem("studentId");
    setStudentId(studentId);

    // setUserId
  }, [login]);

  return (
    <Container className="p-4 ">
      <Row className="d-flex justify-content-lg-center">
        <Col className=" mb-3 public-footer-col-width" xs={6} sm={4} md={2} lg={2}>
          <div>
            <img src={aviar} width="100" height="30" className="d-inline-block align-top mt-3" alt="logo" />
          </div>
          <div
            className="d-flex flex-direction-row mt-2"
            onClick={() => {
              window.open("https://www.bing.com/maps?q=tiruvannamalai&FORM=HDRSC6&cp=12.249997%7E79.083345&lvl=16.0", "_blank");
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} width={"20px"} className="mt-1 me-1 footer-map" color="#3f51b5" />
            <text className="footer-font footer-map">Tiruvannamalai, </text>
            <text className="footer-font footer-map">Tamilnadu</text>
          </div>
          <div className="d-flex flex-direction-row mt-2">
            <FontAwesomeIcon icon={faPhone} width={"20px"} className="mt-1 me-1" color="#3f51b5" />
            <b className="footer-font">
              {/* <a href="tel:7358+5R6, Tiruvannamalai, Tamil Nadu 606604" className="footer-text-decoderation linkColor">
              7358+5R6, Tiruvannamalai, Tamil Nadu 606604 
              </a> */}
            </b>
          </div>
          <div className="d-flex flex-direction-row mt-2">
            <FontAwesomeIcon icon={faEnvelope} className="mt-1 me-1" color="#3f51b5" width={"20px"} />
            <b className="footer-font">
              <a href="mailto:aviartechservices.com" className="footer-text-decoderation linkColor">
                aviartechservices.com
              </a>
            </b>
          </div>
        </Col>
        <Col className="mt-2 public-footer-col-width" xs={6} sm={4} md={2} lg={2}>
          <div>
            <b>Explore</b>
            <br />
            <b>
              <a href="/course/search" className="footer-font-size">
                Courses
              </a>
            </b>
            <br />
            <b>
              <a href="/trainers" className="footer-font-size">
                Trainers
              </a>
            </b>
            <br />
            <b>
              <a href="/about-us" className="footer-font-size">
                About Us
              </a>
            </b>
            <br />
            <b>
              <a href="/terms-of-use" className="footer-font-size">
                Terms of use
              </a>
            </b>
            <br />
            <b>
              <a href="privacy-policy" className="footer-font-size">
                Privacy Policy
              </a>
            </b>
          </div>
        </Col>
        <Col className="mt-2 public-footer-col-width" xs={6} sm={4} md={2} lg={2}>
          <div>
            <b>Account</b> <br />
            {token ? (
              <div>
                <b>
                  {role === "student" ? (
                    <a href={`/edit/student/details/${studentId}`} className="footer-font-size">
                      My Account
                    </a>
               
                  ) : role === "teacher" ? (
                    <a href="/teacher/application/details" className="footer-font-size">
                      My Account
                    </a>
                  ) : null}
                </b>
                {role === "student" || role === "parent" || role === "teacher" ? <br /> : null}

                <b>
                  <a href="/course/search" className="footer-font-size">
                    My courses
                  </a>
                </b>
                <br/>
                <b>
                  <a href="/favourite/course" className="footer-font-size">
                    Favourite
                  </a>
                </b>
                <br />
              </div>
            ) : (
              <b>
                <a href="/login" className="footer-font-size">
                  Login
                </a>
              </b>
            )}
          </div>
        </Col>
        <Col className="mt-2 public-footer-col-width" xs={6} sm={4} md={2} lg={2}>
          <div>
            <b>Stay Connected</b> <br />
            <div className="mt-1">
              <a href="https://www.facebook.com/AVIAR-Technology-Services-116521733596435/" className="footer-font-size d-flex flex-direction-row">
                <FontAwesomeIcon className="me-2 mt-1" icon={faFacebook} />
                Facebook
              </a>
            </div>
            <div className="mt-1">
              <a href="#instagram" className="footer-font-size d-flex flex-direction-row">
                <FontAwesomeIcon className="me-2 mt-1" icon={faInstagram} />
                Instagram
              </a>
            </div>
            <div className="mt-1">
              <a href="https://twitter.com/AVIARTech" className="footer-font-size d-flex flex-direction-row">
                <FontAwesomeIcon className="me-1 mt-1" icon={faTwitter} />
                Twitter
              </a>
            </div>
            <div className="mt-1">
              <a href="https://www.linkedin.com/company/aviar-technology-services/" className="footer-font-size d-flex flex-direction-row">
                <FontAwesomeIcon className="me-1 mt-1" icon={faLinkedinIn} />
                Linkedin
              </a>
            </div>
          </div>
        </Col>

      </Row>
      <hr className="my-2 mb-2" />
      <div className="text-center copy-rights ">
        &copy; {new Date().getFullYear()} aviarteam <br />
        Designed by
        <a
          onClick={() => {
            window.open("https://aviartechservices.com/");
          }}
          className="footer-text-decoderation aviar-technology  ms-1"
        >
          Aviar Technology Services
        </a>
      </div>
    </Container>
  );
}
