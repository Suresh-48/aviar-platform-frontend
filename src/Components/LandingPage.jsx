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
import Navbar from "./Navbar";
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
import backImg1 from "./Images/backImg1.png";
import backImg2 from "./Images/backImg2.png";
import backImg3 from "./Images/backImg3.png";
import backImg4 from "./Images/backImg4.png";
import laptopImg from "./Images/laptopImg.png";
import Img1 from "./Images/Img1.png";
import Img2 from "./Images/Img2.png";
import Img3 from "./Images/Img3.png";
import course from "./Images/course.png";
import courseImg2 from "./Images/courseImg2.png";
import { Link, useNavigate } from "react-router-dom";
import curveImg from "./Images/curveImg.png";
import emptyGallery from "./Images/emptyGallery.jpg";
import loginArrow from "./Images/loginArrow.png";
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
import Footer from "./Footer";
import Api from "../Api";

function LandingPage(props) {

  const loginClosed = props?.location?.state?.sideClose;
  const [allCourseList, setAllCourseList] = useState([]);
  const [publish, setPublish] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [teacher, setTeacher] = useState([]);
  // const cards = Array.from({ length: 20 }, (_, i) => i + 1);
  const navigate = useNavigate();
  const limitedCategories = allCourseList.slice(0, 6);
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
  useEffect(() => {

    getFavouriteList();
    getPublishCourse();

  }, []);
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const slides = chunkArray(publish, 3);
  const scrollLeft = () => {
    cardRowRef.current.scrollBy({ left: -220, behavior: 'smooth' });
  };
  const scrollRight = () => {
    cardRowRef.current.scrollBy({ left: 220, behavior: 'smooth' });
  };
  // get publish course data
  const getPublishCourse = () => {
    console.log("Get Publish Course Call");
    Api.get("api/v1/course/landin/publish/").then((res) => {

      const data = res?.data?.data?.data;
      console.log("Publish Course Data##########:", data);
      setPublish(data);
    });
  };

  const getAllCourse = () => {
    Api.get("api/v1/course/").then((res) => {

      const allCourse = res?.data?.data?.data;
      //  console.log("All Course Data##########:",allCourse);
      setAllCourseList(allCourse);
    });
  };
  const getCategory = () => {
    Api.get("api/v1/category/").then((res) => {
      const categoryDetails = res?.data?.data?.data;
      // console.log("Category Details##########:", res.data.data);
      setCategoryDetails(categoryDetails);
    });
  };
  // const getPublishCourse = async () => {
  //   try {
  //     console.log("Get Publish Course API Call initiated");

  //     const res = await Api.get("api/v1/course/publish/");
  //           console.log("Publish Course Data:");
  //     const data = res?.data?.data?.data || [];


  //     setPublish(data);
  //   } catch (error) {
  //     console.error("API Error:", error);

  //     const status = error?.response?.status;

  //     if (status === 401) {
  //       toast.error("Session Timeout");
  //     } else if (status === 404) {
  //       console.log("No published courses found");
  //       setPublish([]);
  //     } else {
  //       toast.error("Failed to load courses");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getTeacherList = () => {
    Api.get("api/v1/teacher/publish/list").then((res) => {
      const data = res?.data?.data;
      // console.log("Teacher List Data##########:", data);
      setTeacher(data);
    });
  };
  const getFavouriteList = () => {

    console.log("Get Favourite Course Call");
    Api.get("api/v1/favouriteCourse/landinpage")
      .then((response) => {
        console.log("favourite course list", response);
        const list = response.data.data.favouriteCourseList;
        console.log("favourite course list", list);
        // setFavouriteCourseList(list);
        setIsLoading(false);
        setSpinner(false);
      })
    // .catch((error) => {
    //   if (error.response && error.response.status >= 400) {
    //     let errorMessage;
    //     const errorRequest = error.response.request;
    //     if (errorRequest && errorRequest.response) {
    //       errorMessage = JSON.parse(errorRequest.response).message;
    //     }
    //   }

    //   const errorStatus = error?.response?.status;
    //   if (errorStatus === 401) {
    //     logout();
    //     toast.error("Session Timeout");
    //   }

    //   toast.error(error?.response?.data?.message);
    // });
  };
  const convertFromJSONToHTML = (value) => {
    try {
      return { __html: stateToHTML(convertFromRaw(JSON.parse(value))) };
    } catch (exp) {
      return { __html: "Error" };
    }
  };
  const role = localStorage.getItem("role");
  useEffect(() => {
    getAllCourse();
    getCategory();
    getTeacherList();
    getFavouriteList();
    getPublishCourse();
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (role === "student") {
      navigate("/student/dashboard");
    }
  }, [role, navigate]);
  return (
    <div className="landing-page-content-main">
      <Navbar />

      <div
        style={{
          backgroundImage: `url(${studentsImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "calc(100vh - 60px)",
          minHeight: "500px",
          maxHeight: "800px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)"
          }}
        ></div>

        {/* Card Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "20px"
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "600px"
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "20px",
                  padding: "0",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  margin: "0 20px"
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: "24px 30px",
                    borderBottom: "2px solid #dee2e6"
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      fontWeight: 700,
                      color: "#2c3e50",
                      lineHeight: 1.2,
                      textAlign: "center"
                    }}
                  >
                    Choose From a Range of Online Courses
                  </h1>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "30px 30px"
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(1rem, 2vw, 1.25rem)",
                      color: "#495057",
                      lineHeight: 1.6,
                      textAlign: "center"
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "20px 0",
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
            zIndex: 1
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              {/* First Line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px"
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    lineHeight: 1
                  }}
                >
                  Where
                </span>
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#ffc107",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    lineHeight: 1
                  }}
                >
                  EveryOne
                </span>
              </div>

              {/* Second Line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#0dcaf0",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    lineHeight: 1
                  }}
                >
                  Love
                </span>
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    lineHeight: 1
                  }}
                >
                  Learning...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="extra-content-div my-4">
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
      </div> */}


      <div >
        <div>


          {/* {limitedCategories.length > 0 ? (
            <div className="profile-div-main">
              <div className="profile-div-sub">
                <p className="slider-trainer-upcoming">Categories</p>

                <Button
                  className="btn-Upcomingcourse"
                  style={{ marginLeft: "90%" }}
                  onClick={() => navigate("/login")}
                >
                  View All
                </Button>

                <Carousel
                  indicators={true}
                  controls={true}
                  interval={5000}
                  wrap={true}
                  touch={true}
                  variant="dark"
                  className="custom-carousel"
                >
                  {Array.from({ length: Math.ceil(limitedCategories.length / 3) }, (_, chunkIndex) => (
                    <Carousel.Item key={chunkIndex}>
                      <div className="d-flex justify-content-center align-items-center gap-5 py-5">
                        {limitedCategories
                          .slice(chunkIndex * 3, chunkIndex * 3 + 3)
                          .map((item, itemIndex) => (
                            <div
                              key={item.id || itemIndex}
                              style={{
                                minWidth: "250px",
                                minHeight: "280px",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <img
                                src={item.image || emptyGallery}
                                alt={item.name}
                                className="rounded-3 mb-3"
                                style={{
                                  width: "180px",
                                  height: "180px",
                                  objectFit: "cover",
                                }}
                              />
                              <h5 className="fw-bold text-dark mb-0">{item.name}</h5>
                            </div>
                          ))}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          ) : null} */}
          {limitedCategories.length > 0 ? (
            <div
              style={{
                width: "100%",
                padding: "20px 10px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Categories
                  </p>

                  <Button
                    style={{
                      backgroundColor: "#007bff",
                      border: "none",
                      color: "#fff",
                      padding: "8px 16px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    View All
                  </Button>
                </div>

                <Carousel
                  indicators
                  controls
                  interval={5000}
                  wrap
                  touch
                  variant="dark"
                >
                  {Array.from(
                    {
                      length: Math.ceil(limitedCategories.length / 3),
                    },
                    (_, chunkIndex) => (
                      <Carousel.Item key={chunkIndex}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "25px",
                            padding: "25px 0",
                          }}
                        >
                          {limitedCategories
                            .slice(chunkIndex * 3, chunkIndex * 3 + 3)
                            .map((item, itemIndex) => (
                              <div
                                key={item.id || itemIndex}
                                style={{
                                  flex: "1 1 calc(33.33% - 20px)", // 3 per row desktop
                                  maxWidth: "300px",
                                  minWidth: "180px",
                                  textAlign: "center",
                                  transition: "transform 0.3s ease",
                                }}
                              >
                                <img
                                  src={item.image || emptyGallery}
                                  alt={item.name}
                                  style={{
                                    width: "160px",
                                    height: "160px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <h5
                                  style={{
                                    margin: 0,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#222",
                                  }}
                                >
                                  {item.name}
                                </h5>
                              </div>
                            ))}
                        </div>
                      </Carousel.Item>
                    )
                  )}
                </Carousel>
              </div>
            </div>
          ) : null}


          <br />
        </div>
        {publish.length > 0 ? (
          <div className="profile-div-main">
            <div className="profile-div-sub">
              <p className="slider-trainer-upcoming">Recommended Courses for you</p>

              <Button
                className="btn-Upcomingcourse"
                style={{ marginLeft: "90%" }}
                onClick={() => navigate("/login")}
              >
                View All
              </Button>

              {/* Auto-slide every 3 seconds */}
              <Carousel controls={false} indicators={false} interval={3000} pause={false}>
                {slides.map((group, i) => (
                  <Carousel.Item key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "20px",
                      }}
                    >
                      {group.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: "20%",
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <img
                            src={item.image || emptyGallery}
                            alt={item.aliasName}
                            style={{
                              width: "70%",
                              height: "220px",
                              objectFit: "cover",
                              margin: "auto",
                              borderRadius: "8px",
                            }}
                          />

                          {/* aliasName display */}
                          <p style={{ marginTop: "10px", fontWeight: "600" }}>
                            {item.aliasName}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        ) : null}


        <br />
        {/* <div className="back-image-main">
          <img src={backImg4} alt="" className="back-image-one" />
          <div className="back-image-center">
            <div className="back-image-sub-center">
              <div className="back-image-align">
                <p className="back-image-pTag1" style={{ color: "Yellow" }}>Become an Instructor</p>
                <p className="back-image-pTag2">
                  Teach what you love. Aviar gives you the tools start
                  <br /> an online course.
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
        </div> */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={backImg4}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "50px 20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "300px",
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "yellow",
                }}
              >
                Become an Instructor
              </p>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "26px",
                  marginBottom: "20px",
                }}
              >
                Teach what you love. Aviar gives you the tools start
                <br /> an online course.
              </p>

              {/* Round Icon Section */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {[{ img: Img1, label: "Online Based\nClass" },
                { img: Img2, label: "Perfect\nUnderstanding" },
                { img: Img3, label: "16% Utilization" }].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        marginLeft: "10px",
                        whiteSpace: "pre-line",
                        fontSize: "14px",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate("/teacher/signup")}
                style={{
                  marginTop: "25px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Teacher Signup
              </Button>
            </div>

            <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
              <img
                src={laptopImg}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* <div className="profile-div-main">
          <div className="profile-div-sub">
            <p className="slider-trainer-upcoming">Upcoming Courses</p>

            <Button className="btn-Upcomingcourse" style={{ marginLeft: "90%" }} onClick={() => navigate("/login")}>
              View All
            </Button>
            {/* <br/> */}
        {/* <Carousel>
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
        </Carousel> */}
        {/* </div>
        </div> */}

        <div
          style={{
            width: "100%",
            padding: "20px 10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 10px 0",
                }}
              >
                Upcoming Courses
              </p>

              <Button
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  color: "#fff",
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
                onClick={() => navigate("/login")}
              >
                View All
              </Button>
            </div>

            {/* Carousel */}
            <Carousel indicators controls interval={3500} wrap touch>
              {[1, 2, 3].map((item, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: "25px 0",
                    }}
                  >
                    <img
                      src={emptyGallery}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: "100%",
                        maxWidth: "220px",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>



        {/* {teacher?.length > 0 ? (
          <div className="profile-div-main">
            <div className="profile-div-sub">
              <p className="slider-trainer-upcoming">Top Trainers</p>
              <Carousel
                indicators={false}
                interval={null}
                wrap={false}
                variant="dark"
                className="custom-carousel"
              >

                {Array.from({ length: Math.ceil(teacher.slice(0, 5).length / 3) }, (_, slideIndex) => (
                  <Carousel.Item itemsToShow={3} itemsToScroll={1} renderArrow={ChangeArrow}>
                    <div className="row justify-content-center">
                      {teacher.slice(0, 5).slice(slideIndex * 3, (slideIndex + 1) * 3).map((item, i) => (
                        <div key={item.id || i} className="col-md-4">
                          <div className="inside-carousel-div1">
                            <div className="inside-carousel-div2">
                              {item?.imageUrl ?
                                <img src={item?.imageUrl} className="trainer-img" alt={item.firstName} /> :
                                <img src={user1} alt="Default user" />
                              }
                              <div className="user-details-div">
                                <div>
                                  <p className="kharpi-user-name mb-0">{item?.firstName + " " + item?.lastName}</p>
                                  <hr className="hr-line-user my-2" />
                                  <p className="kharpi-user-profession">Business Representative</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        ) : null} */}

        {teacher?.length > 0 ? (
          <div
            style={{
              width: "100%",
              padding: "20px 10px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Top Trainers
              </p>

              <Carousel indicators={false} wrap={false} variant="dark" interval={null}>
                {Array.from(
                  { length: Math.ceil(teacher.slice(0, 5).length / 3) },
                  (_, slideIndex) => (
                    <Carousel.Item key={slideIndex}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "25px",
                          padding: "25px 0",
                        }}
                      >
                        {teacher
                          .slice(0, 5)
                          .slice(slideIndex * 3, (slideIndex + 1) * 3)
                          .map((item, i) => (
                            <div
                              key={item.id || i}
                              style={{
                                flex: "1 1 calc(33.33% - 20px)",
                                minWidth: "200px",
                                maxWidth: "280px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  background: "#fff",
                                  borderRadius: "12px",
                                  padding: "15px",
                                  textAlign: "center",
                                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                                }}
                              >
                                <img
                                  src={item?.imageUrl || user1}
                                  alt={item.firstName}
                                  style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    marginBottom: "10px",
                                    border: "3px solid #007bff",
                                  }}
                                />

                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    margin: "0",
                                    color: "#222",
                                  }}
                                >
                                  {item?.firstName + " " + item?.lastName}
                                </p>

                                <hr
                                  style={{
                                    width: "40px",
                                    margin: "8px auto",
                                    border: "1px solid #007bff",
                                  }}
                                />

                                <p
                                  style={{
                                    fontSize: "14px",
                                    color: "#666",
                                    margin: 0,
                                  }}
                                >
                                  Business Representative
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Carousel.Item>
                  )
                )}
              </Carousel>
            </div>
          </div>
        ) : null}



        {/* <Row>
                <Col md={2}> */}
        {/* <div className="Col-6"> */}
        {/* </Col> */}
        {/* <div className="Col-3"> */}
        {/* <Col md={3}> */}
        {/* </Col>
              </Row> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="carousel-wrapper">
            </div> */}
        {/* <ChatBotConversation /> */}
        <Footer />
      </div>




    </div>
  )
}
export default LandingPage;