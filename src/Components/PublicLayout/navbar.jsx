import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import curveImg from "../../Components/Images/curveImg.png";
import aviar from "../Images/aviar.png";
import loginArrow from "../../Components/Images/loginArrow.png";
import { use } from "react";

function NavbarLoginBefore(props) {
//   const history = useHistory();
const navigate = useNavigate();
  const [role, setrole] = useState();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setrole(role);
  }, []);

  return (
    <div>
      <div className="curve-shape-main-div">
        <div className="curve-shape-main-div-sec">
          <img src={curveImg} alt="" className="curve-shape-main-image" />
        </div>
        <div className="aviar-img-div">
          <img src={aviar} onClick={() => navigate("/aviar")} alt="aviar-logo" className="aviar-logo" />
          {role === "admin" || role === "teacher" || role === "student" ? null : (
            <div className="login-arrow-div me-0" onClick={() => navigate("/login")}>
              <img src={loginArrow} className="login-arrow" />
              <p className="login-pTag mb-0 mx-1 ">Login</p>
            </div>
          )}
        </div>
        <div className="aviar-img-div-two">
          <div className="mt-4 d-md-flex flex-sm-column flex-md-row">
            <p className="links mx-xs-2 mx-md-4" onClick={() => navigate("/course/search")}>
              Courses
            </p>
            <p className="links mx-xs-2 mx-md-4" onClick={() => navigate("/trainers")}>
              Trainers
            </p>
            <p className="links mx-xs-2 mx-md-4" onClick={() => navigate("/about-us")}>
              About Us
            </p>
            <p className="links mx-xs-2 mx-md-4" onClick={() => navigate("/help")}>
              Help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLoginBefore;
