import React, { useEffect, useRef, useState } from "react";
import studentsImg from "./Images/studentsImg.png";
import "../CSS/LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aviar from "./Images/aviar.png";

import { Button, Card, Form, InputGroup, Carousel, Container, Row, Col } from "react-bootstrap";
// import Avatar from "react-avatar";
import {
  faAddressCard,
  faArrowRightFromBracket,
  faArrowUpRightFromSquare,
  faBook,
  faChevronCircleLeft,
  faChevronCircleRight,
  faLink,

  faSearch,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// import { Rating } from "@mui/material";
import user1 from "./Images/user1.png";
import layer1 from "./Images/Layer1.png";
import layer2 from "./Images/Layer2.png";
import layer3 from "./Images/Layer3.png";
import layer4 from "./Images/Layer4.png";
// import Carousel, { consts } from "react-elastic-carousel";
import Item from "./Item";
import ItemOne from "./ItemOne";
import ItemTwo from "./ItemTwo";
// import backImg1 from "./Images/backImg1.png";
// import backImg2 from "./Images/backImg2.png";
import backImg3 from "./Images/backImg3.png";
import backImg4 from "./Images/backImg4.png";
import laptopImg from "./Images/laptopImg.png";
import Img1 from "./Images/Img1.png";
import Img2 from "./Images/Img2.png";
import Img3 from "./Images/Img3.png";
import course from "./Images/course.png";
import courseImg2 from "./Images/courseImg2.png";
// import Api from "../../Api";
// import user1 from "./Images/user1.png";
// import Img4 from "./Images/Img4.png";
// import DQ from "./Images/DQ.png";
import { Link, useNavigate } from "react-router-dom";
import curveImg from "./Images/curveImg.png";
import emptyGallery from "./Images/emptyGallery.jpg";
import loginArrow from "./Images/loginArrow.png";
// import { convertFromRaw } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import overlayImg from "./Images/overlayImg.png";
import { faYoutube, faFacebook, faTwitter, faInstagram, faMailchimp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faMailBulk,
  faMailReply,
  faPaperPlane,
  faPhone,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
// import Aviar from "../../components/core/Aviar.png";
// import England from "../../container/PublicLayout/England.png";
// import Russia from "../../container/PublicLayout/Russia.jpg";
// import USA from "../../container/PublicLayout/USA.png";

function LandingPage(props) {

  const loginClosed = props?.location?.state?.sideClose;
  const [allCourseList, setAllCourseList] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [teacher, setTeacher] = useState([]);
  // const cards = Array.from({ length: 20 }, (_, i) => i + 1);
  const navigate = useNavigate();
  const ChangeArrow = ({ type, onClick, isEdge }) => (
    <div onClick={onClick} className="arrow-div">
      {type === consts.PREV ? (
        <FontAwesomeIcon icon={faChevronCircleLeft} fontSize="35px" color="#375474" className="arrow-div-main" />
      ) : (
        <FontAwesomeIcon icon={faChevronCircleRight} fontSize="35px" color="#375474" className="arrow-div-main" />
      )}
    </div>
  );
  const ChangeArrowOne = ({ type, onClick, isEdge }) => (
    <div onClick={onClick} className="arrow-div1">
      {type === consts.PREV ? (
        <FontAwesomeIcon icon={faChevronCircleLeft} fontSize="60px" color="#375474" className="arrow-div-main1" />
      ) : (
        <FontAwesomeIcon icon={faChevronCircleRight} fontSize="60px" color="#375474" className="arrow-div-main2" />
      )}
    </div>
  );
  // const scrollLeft = () => {
  //   cardRowRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  // };

  // const scrollRight = () => {
  //   cardRowRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  // };
  //get publish course data
  // const getPublishCourse = () => {
  //   Api.get("api/v1/course/publish").then((res) => {
  //     const data = res?.data?.data?.data;
  //     setAllCourseList(data);
  //   });
  // };

  // const getAllCourse = () => {
  //   Api.get("api/v1/course/").then((res) => {
  //     const allCourse = res?.data?.data?.data;
  //     // setAllCourseList(allCourse);
  //   });
  // };

  // const getCategory = () => {
  //   Api.get("api/v1/category/").then((res) => {
  //     const categoryDetails = res?.data?.data?.data;
  //     setCategoryDetails(categoryDetails);
  //   });
  // };
  // const getTeacherList = () => {
  //   Api.get("api/v1/teacher/publish/list").then((res) => {
  //     const data = res?.data?.data;
  //     setTeacher(data);
  //   });
  // };

  // const convertFromJSONToHTML = (value) => {
  //   try {
  //     return { __html: stateToHTML(convertFromRaw(JSON.parse(value))) };
  //   } catch (exp) {
  //     return { __html: "Error" };
  //   }
  // };
  const role = localStorage.getItem("role");

  useEffect(() => {
    // getAllCourse();
    // getCategory();
    // getTeacherList();
    // getPublishCourse();
    localStorage.clear();
  }, []);

  return (
    <div className="landing-page-content-main">
      <div className="curve-shape-main-div">
        <div className="curve-shape-main-div-sec-value ">
          <img src={curveImg} alt="" className="curve-shape-main-image" />
        </div>
        <div className="aviar-img-div">
         
          <img src={aviar} alt="" className="aviar-logo" />
          {role === "admin" || role === "teacher" || role === "student" ? null : (
            <div className="login-arrow-div-arrows" onClick={() => navigate("/login")}>
              <img src={loginArrow} className="login-arrow " />
              <p className="login-pTag mb-0 mx-1">Login</p>
            </div>
          )}
        </div>
        <div className="aviar-img-div-two">
          <div className="content-link">
            <p className="links mx-4" onClick={() => navigate("/course/search")}>
              Courses
            </p>
            <p className="links mx-4" onClick={() => navigate("/trainers")}>
              Trainers
            </p>
            <p className="links mx-4" onClick={() => navigate("/about-us")}>
              About Us
            </p>
            <p className="links mx-4" onClick={() => navigate("/help")}>
              Help
            </p>
          </div>
        </div>
      </div>
      <div
        className="image-div-one"


        style={{
          backgroundImage: `url(${studentsImg})`,
          backgroundSize: "cover",
          height: "73vh",
        }}
      >
        <div className="card-main">
          <Card className="card-align mx-5 ">
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

        <div className="one-line-comment">
          <div>
            <div className=" d-flex">
              <p className="one-line-comment-pTag1 mb-0 ">Where</p>
              <p className="one-line-comment-pTag2 mb-0 mx-3 ">EveryOne</p>
            </div>
            <div className=" d-flex mx-5">
              <p className="one-line-comment-pTag3 mb-0 mx-4">Love</p>
              <p className="one-line-comment-pTag1 mb-0 ">Learning...</p>
            </div>
          </div>

        </div>
      </div>

      <div className="extra-content-div my-4">
        <div className="extra-content-list">
          <img src={layer2} alt="" className="extra-content" />
          <p className="extra-content-pTag-one ">
            High Quality
            <p className="extra-content-pTag-two">We value quality over quantity</p>
          </p>
        </div>

        <div className="extra-content-list">
          <img src={layer3} alt="" className="extra-content" />
          <p className="extra-content-pTag-one ">
            Convenience
            <p className="extra-content-pTag-two">All courses in one place</p>
          </p>
        </div>
        <div className="extra-content-list">
          <img src={layer4} alt="" className="extra-content" />
          <p className="extra-content-pTag-one ">
            Hassle Free
            <p className="extra-content-pTag-two">Quick, easy and reliable</p>
          </p>
        </div>
        <div className="extra-content-list">
          <img src={layer1} alt="" className="extra-content" />
          <p className="extra-content-pTag-one ">
            24/7 Support
            <p className="extra-content-pTag-two">Easy Communication</p>
          </p>
        </div>
      </div>

      <div >


     
        
      <div
      // className="upcomings-div-main"
      >
       
              <div className="profile-div-main">
        <div className="profile-div-sub">
          <p className="slider-trainer-upcoming">Categories</p>
          <Button className="btn-Upcomingcourse" style={{ marginLeft: "90%" }} onClick={() => navigate("/login")}>
            View All
          </Button>
          {/* <br/> */}
          <Carousel>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div>
                <img src={emptyGallery} alt=" second slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
          </Carousel>






        </div>
      </div>
        <br />








      </div>


           <div className="profile-div-main">
        <div className="profile-div-sub">
          <p className="slider-trainer-upcoming">Recommended Courses for you</p>
          
          <Button className="btn-Upcomingcourse" style={{ marginLeft: "90%" }} onClick={() => navigate("/login")}>
            View All
          </Button>
          {/* <br/> */}
          <Carousel>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div>
                <img src={emptyGallery} alt=" second slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
          </Carousel>






        </div>
      </div>
      <br />

      <div className="back-image-main">
        <img src={backImg4} alt="" className="back-image-one" />
        <div className="back-image-center">
          <div className="back-image-sub-center">
            <div className="back-image-align">
              <p className="back-image-pTag1" style={{ color: "Yellow" }}>Become an Instructor</p>
              <p className="back-image-pTag2">
                Teach what you love. Aviar gives you the tools start
                <br/> an online course.
              </p>
              <div className="round-image-content">
                <div className="round-and-pTag justify-content-end">
                  <div className="round-img-div">
                    <img src={Img1} alt="" className="round-img" />
                  </div>
                  <p className=" next-to-image mx-2">
                    Online Based <br />
                    Class
                  </p>
                </div>
                <div className="round-and-pTag1 mx-5 justify-content-center">
                  <div className="round-img-div">
                    <img src={Img2} alt="" className="round-img" />
                  </div>
                  <p className=" next-to-image mx-2">
                    Perfect
                    <br /> Understanding
                  </p>
                </div>
                <div className="round-and-pTag justify-content-start">
                  <div className="round-img-div">
                    <img src={Img3} alt="" className="round-img" />
                  </div>
                  <p className=" next-to-image mx-2">
                    16% <br />
                    Utilization
                  </p>
                </div>
              </div>
              <div className="btn-back-image">
                <Button className="btn-back-image-main Aviar-save-btn" onClick={() => navigate("/teacher/signup")}>
                  Teacher Signup
                </Button>
              </div>
            </div>
            <div>
              <img src={laptopImg} className="back-image-center-main" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />


           <div className="profile-div-main">
        <div className="profile-div-sub">
          <p className="slider-trainer-upcoming">Upcoming Courses</p>
         
          <Button className="btn-Upcomingcourse" style={{ marginLeft: "90%" }} onClick={() => navigate("/login")}>
            View All
          </Button>
          {/* <br/> */}
          <Carousel>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div>
                <img src={emptyGallery} alt=" second slide"
                  style={{ width: "16%", display: "flex", alignContent: "center", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>


              <div>
                <img src={emptyGallery} alt="first slide"
                  style={{ width: "16%", display: "flex", margin: "auto" }}
                />
              </div>
            </Carousel.Item>
          </Carousel>





        </div>
      </div>
      <div className="profile-div-main">
        <div className="profile-div-sub">
          <p className="slider-trainer-upcoming">Top Trainers</p>
          
          <Button className="btn-Upcomingcourse" style={{ marginLeft: "90%" }} onClick={() => navigate("/login")}>
            View All
          </Button>
          <Carousel >
            <Carousel.Item>
              {/* {teacher?.slice(0, 5).map((item, i) => ( */}
              <div className="inside-carousel-div1" style={{ margin: "auto" }}>
                <div className="inside-carousel-div2">

                  <div className="user-details-div" >
                    <div className="user1img">
                      <img src={user1} alt=""
                        className="user1img"
                      />
                    </div>
                    <div>

                      <hr className="hr-line-user my-2" />
                      <p className="Aviar-user-profession">Aviar User1</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              {/* {teacher?.slice(0, 5).map((item, i) => ( */}
              <div className="inside-carousel-div1" style={{ margin: "auto" }}>
                <div className="inside-carousel-div2">

                  <div className="user-details-div" >
                    <div>

                      <hr className="hr-line-user my-2" />
                      <p className="Aviar-user-profession">Aviar User2</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              {/* {teacher?.slice(0, 5).map((item, i) => ( */}
              <div className="inside-carousel-div1" style={{ margin: "auto" }}>
                <div className="inside-carousel-div2">

                  <div className="user-details-div" >
                    <div>

                      <hr className="hr-line-user my-2" />
                      <p className="Aviar-user-profession">Aviar User3</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              {/* {teacher?.slice(0, 5).map((item, i) => ( */}
              <div className="inside-carousel-div1" style={{ margin: "auto" }}>
                <div className="inside-carousel-div2">

                  <div className="user-details-div" >
                    <div>

                      <hr className="hr-line-user my-2" />
                      <p className="Aviar-user-profession"> Aviar User4</p>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>

          </Carousel>

          <div className="carousel-wrapper">

          </div>
        </div>
      </div>



      {/* <Row>
                <Col md={2}> */}
      <div className="Col-6">


        {/* </Col> */}

        <div className="Col-3">


          {/* <Col md={3}> */}

          {/* </Col>
              </Row> */}
        </div>


      </div>
      {/* <div className="carousel-wrapper">

            </div> */}


      {/* <ChatBotConversation /> */}
      <div className="landing-page-footer-background">
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
            &copy; {new Date().getFullYear()} Kharphi Team 
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
    </div>
    </div>
  )

}

export default LandingPage;
