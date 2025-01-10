
import react from "react";
import { Card, Container } from "react-bootstrap";
import curveImg from "./LandingPageImg/curveImg.png";
import aviarlogo from "./LandingPageImg/aviarlogo.png";
import studentsImg from "./LandingPageImg/studentsImg.png";
import loginArrow from "./LandingPageImg/loginArrow.png";
import backImg3 from "./LandingPageImg/backImg3.png";
import laptopImg from "./LandingPageImg/laptopImg.png";
import coding from "./LandingPageImg/coding.png";
import Layer2 from "./LandingPageImg/Layer2.png";
import "./CSS/LandingPage.css";
const LandingPage = () => {
  return (
        <div className="LandingPage-container">
      <div className="aviarlogo-div-one">
        <div className="text-center">
          <img src={aviarlogo} alt="" />
        </div>
        <div className="Content-link ">
          <p
            className="links mx-4"
            onClick={() => history.push("/course/search")}
          >
            Courses
          </p>
          <p className="links mx-4" onClick={() => history.push("/trainers")}>
            Trainers
          </p>
          <p className="links mx-4" onClick={() => history.push("/about-us")}>
            About Us
          </p>
          <p className="links mx-4" onClick={() => history.push("/help")}>
            Help
          </p>
        </div>
        <div className="curveImg">
          <img src={curveImg} alt="" />
        </div>
        <div
          className="login-arrow-div"
          onClick={() => history.push("/login")}
        ></div>
        <div className="loginArrow ">
          <img src={loginArrow} alt="" className="LoginArrowImg " />
          <p className="login-pTag mb-0 mx-5">Login</p>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};
export default LandingPage;
