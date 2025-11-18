import React,{useEffect} from 'react'
import laptopImg from "./Images/laptopImg.png";
import Img1 from "./Images/Img1.png";
import Img2 from "./Images/Img2.png";
import Img3 from "./Images/Img3.png";
import loginArrow from "./Images/loginArrow.png";
import curveImg from "./Images/curveImg.png";
import { Link, useNavigate,useLocation } from "react-router-dom";
import aviar from "./Images/aviar.png";
const Navbar = () => {
      const role = localStorage.getItem("role");
      const navigate = useNavigate();
        const location = useLocation();
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
    
        <div>
            <div className="curve-shape-main-div">
                <div className="curve-shape-main-div-sec-value ">
                  <img src={curveImg} alt="" className="curve-shape-main-image" />
                </div>
                <div className="aviar-img-div">
                 
                  <img src={aviar} alt="" className="aviar-logo" />
                  {role === "admin" || role === "teacher" || role === "student" || location.pathname === "/login" ? null : (
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
    </div>
  )
}

export default Navbar