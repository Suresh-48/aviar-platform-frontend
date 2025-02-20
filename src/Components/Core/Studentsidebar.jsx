import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";
// Styles
import "../../CSS/SideBar.css";
import aviar from "../../Images/aviar.png";
import PublicFooter from "../PublicLayout/PublicFooter";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleChevronLeft,
  faPowerOff,
  faIdCard,
  faClipboardCheck,
  faChalkboardUser,
  faCalendarCheck,
  faLightbulb,
  faUserPlus,
  faHouseCircleCheck,
  faUserGroup,
  faBookBookmark,
  faStar,
  faBook,
  faScroll,
  faBookOpenReader,
  faClipboardList,
  faFileCircleCheck,
  faPersonCircleCheck,
  faBookOpen,
  faBookReader,
  faMoneyCheckDollar,
  faPersonChalkboard,
  faPenToSquare,
  faAddressCard,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";

import Avatar from "react-avatar";
import { toast } from "react-toastify";

const Studentsidebar = ({ onClick, open, sidebar }) => {
  console.log()
  const [role, setrole] = useState("");
  const sidebarValue = sidebar;
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [userDetails, setuserDetails] = useState("");
  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [checkPassword, setCheckPassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [studentId, setstudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [image, setImage] = useState("");
  const [status, setstatus] = useState("");

  useEffect(() => {
    // getUserDetails();
  }, [sidebarValue]);

  return (
    <div>
      <div>
        <div className={`${open ? "sidebar" : "sidebar active"}`}>
          <div className="logo-content">
            <div className="logo px-4 py-2 ">
              <img src={aviar} alt="Aviar" width={"80%"} height={"100%"} />
            </div>
            {/* {open === true ? ( */}
            <FontAwesomeIcon
              icon={faBars}
              size="1x"
              onClick={() => {
                onClick(!open);
              }}
              className="menu-button "
            />
          </div>
          <div>
            {/* {isParent === true || isStudent === true ? ( */}
            <div className="nav-list">
              {/* {isStudent ? (
                  isStudent && checkPassword ? ( */}
              <div>
                <div className="d-flex flex-direction-row mb-3">
                  <div className="mx-1"></div>
                  <div className="mt-1 ms-2">
                    {/* <b className="first-name-last">{firstName + " " + lastName}</b> */}
                    <br />
                    {/* <Tooltip className="email-tooltip" title={userDetails.email}> */}
                    <p
                      className="first-name-last text-truncate mb-0"
                      style={{
                        display: "block",
                        width: "160px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      //   title={userDetails.email}
                    >
                      {/* {email} */}
                    </p>
                    {/* </Tooltip> */}
                  </div>
                </div>
                <div className="menu-list  ">
                  {/* <NavLink to="/dashboard" activeClassName="main-nav-active-style"> */}
                  <FontAwesomeIcon
                    icon={faChalkboardUser}
                    className="menu-icon me-3"
                    title="Dashboard"
                    size="1x"
                  />
                  Dashboard
                  {/* </NavLink> */}
                </div>
                <div className="menu-list">
                  <NavLink
                    to={"/Updatestudentdetail"}
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faIdCard}
                      title="My Profile"
                      size="1x"
                      className="menu-icon me-3"
                    />
                    My Profile
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/Upcomingschedule1"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      title="Upcoming Schedule"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Upcoming Schedule
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/AllCourseList"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faBook}
                      title="Courses"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Courses
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/List"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      title="Favourite Course"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Favourite Courses
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/Quize"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      title="Quiz"
                      className="menu-icon me-3"
                    />
                    Quiz
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/Homework"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faHouseCircleCheck}
                      title="Home Work"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Home Work
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/Transcript"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faScroll}
                      title="Transcript"
                      className="menu-icon me-3 me-3"
                      size="1x"
                    />
                    Transcript
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/ActiveCourses"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faBookOpenReader}
                      title="Active Course"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Active Course
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/Forumdetail"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      title="Completed Course"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Forum
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/CompleteCourse"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      title="Completed Course"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Completed Course
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="/CourseHistory"
                    activeClassName="main-nav-active-style"
                  >
                    <FontAwesomeIcon
                      icon={faFileCircleCheck}
                      title="Course History"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Course History
                  </NavLink>
                </div>
                <div className="menu-list">
                  {/* <NavLink
                          exact
                          to="#"
                          onClick={() => {
                            logout();
                          }}
                        > */}
                  <NavLink exact to="/" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      title="Logout"
                      className="menu-icon me-3"
                      size="1x"
                    />
                    Logout
                  </NavLink>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default Studentsidebar;
