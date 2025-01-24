import React from 'react'
import { Card, Container } from 'react-bootstrap'
import curveImg from './Images/curveImg.png'
import aviarlogo from './Images/aviarlogo.png'
import studentsImg from './Images/studentsImg.png'
import loginArrow from './Images/loginArrow.png'
import backImg3 from './Images/backImg3.png'
import laptopImg from './Images/laptopImg.png'
import coding from './Images/coding.png'
import Layer2 from './Images/Layer2.png'
import './CSS/LandingPage.css'
const LandingPage = () => {
  return (
    <div className="landing-page-content-main">
      <div className="Img-shape">

        <img src={aviarlogo} alt="" className='aviarlogoImg' />
      </div>
      <div className="aviarlogo-img-div-two">
        <div className="content-link">
          <p className="links mx-4" onClick={() => history.push("/course/search")}>
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
          <div className='login-group'>
            <div className="login-arrow-div" onClick={() => history.push("/login")}>
              <img src={loginArrow} className="login-arrow" />
              <p className="login-pTag mx-auto">Login</p></div>
          </div>
        </div>

        <img src={curveImg} alt="" className='curveImg' />
        <div className='student-group'>
          <img src={studentsImg} alt="" className='studentsImg' />
        </div>
        <div className='card-main'>
          <Card className="card-align">
            <Card.Header className="card-header">
              <p className="card-header-pTag ">Choose From a Range of Online Courses</p>
            </Card.Header>
            <Card.Body>
              <p className="card-body-pTag">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,
              </p>

            </Card.Body>
          </Card>
          </div>
          <div className="extra-content-div">
            <div className="extra-content-list">
              <img src={Layer2} alt="" className="extra-content" />
            </div>
          </div>
          <div className="back-image-align">
            <img src={backImg3} alt="" className="back-image-one" />
            <img src={laptopImg} alt="" className="back-image-center-main" />
            <img src={coding} alt="" className="back-image" />
          </div>
        </div>
     
      {/* </div> */}

    </div>


  )
}
export default LandingPage


import react from "react";
import { Card, Container } from "react-bootstrap";
import curveImg from "./Images/curveImg.png";
import aviarlogo from "./Images/aviarlogo.png";
import studentsImg from "./Images/studentsImg.png";
import loginArrow from "./Images/loginArrow.png";
import backImg3 from "./Images/backImg3.png";
import laptopImg from "./Images/laptopImg.png"; 
import coding from "./Images/coding.png";
import Layer2 from "./Images/Layer2.png";
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
            className="links mx-4 ...."
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
          <div className="loginArrow ">
          <img src={loginArrow} alt="" className="LoginArrowImg " />
          <p className="login-pTag mb-0 mx-5">Login</p>
        </div>
        </div>
        <div className="curveImg">
          <img src={curveImg} alt="" />
        </div>
   
        <div
          className="login-arrow-div"
          onClick={() => history.push("/login")}
        ></div>
        
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