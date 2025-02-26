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
    <div className="landing-page-footer-background ">
           <Container className="p-4">
             <Row>
               <Col className=" mb-3">
                 <div>
                   <img src={aviar} width="30%" height="30" className="d-inline-block align-top mt-3" alt="logo" />
                 </div>
                 <div
                   className="d-flex flex-direction-row mt-2"
                   onClick={() => {
                     window.open("https://www.google.com/maps/place/AVIAR+Technology+Services/@12.2579188,79.0644428,687m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bacc1d66f0545e3:0xa3c31606e7dae377!8m2!3d12.2579136!4d79.0670177!16s%2Fg%2F11mv4wd0_r?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D", "_blank");
                   }}
                 >
                   <FontAwesomeIcon icon={faLocationDot} width={"20px"} className="mt-1 me-1 footer-map" color="#3f51b5" />
               
                   <text className="footer-font footer-map">Tiruvannamalai, </text>
                   <text className="footer-font footer-map">Tamilnadu</text>
                 </div>
                 <div className="d-flex flex-direction-row mt-2">
                   {/* <FontAwesomeIcon icon={faPhone} width={"20px"} className="mt-1 me-1" color="#3f51b5" /> */}
                   <b className="footer-font">
                 
                   </b>
                 </div>
                 <div className="d-flex flex-direction-row mt-2">
                   <FontAwesomeIcon icon={faEnvelope} className="mt-1 me-1" color="#3f51b5" width={"20px"} />{" "}
                   <b className="footer-font">
                   <a href="mailto:aviartechservices.com" className="footer-text-decoderation linkColor">
                       avairtechservices.com
                     </a>
                   </b>
                 </div>
               </Col>
               <Col className="mt-2">
                 <div>
                   <b>Explore</b>
                   <br />
                   <b>
                     <a href="/login" className="footer-font-size">
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
               <Col className="mt-2">
                 <div>
                   <b>Account</b> <br />
                   <b>
                     <a href="/login" className="footer-font-size">
                       Login
                     </a>
                   </b>
                 </div>
               </Col>
               <Col className="mt-4">
                 <div>
                   <b>Stay Connected</b> <br />
                   <div>
                     <a href="#facebook" className="footer-font-size d-flex flex-direction-row">
                       <FontAwesomeIcon className="me-2 mt-1" icon={faFacebook} />
                       Facebook
                     </a>
                   </div>
                   <div>
                     <a href="#instagram" className="footer-font-size d-flex flex-direction-row">
                       <FontAwesomeIcon className="me-2 mt-1" icon={faInstagram} />
                       Instagram
                     </a>
                   </div>
                   <div>
                     <a href="#twitter" className="footer-font-size d-flex flex-direction-row">
                       <FontAwesomeIcon className="me-1 mt-1" icon={faTwitter} />
                       Twitter
                     </a>
                   </div>
                 </div>
               </Col>
             </Row>
             <hr className="my-2 mb-2" />
             <div className="text-center copy-rights ">
               &copy; {new Date().getFullYear()} Kharphi Team <br />
               Designed by{" "}
               <a
                 onClick={() => {
                   window.open("https://aviartechservices.com/");
                 }}
                 className="footer-text-decoderation"
               >
                 Aviar Technology Services
               </a>
             </div>
           </Container>
         </div>
  );
}
