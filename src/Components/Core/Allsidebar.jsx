import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Avatar from "react-avatar";
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
  faMoneyCheckDollar,
  faBookOpenReader,
  faClipboardList,
  faFileCircleCheck,
  faPersonChalkboard,
  faPeopleLine,
  faBookOpen,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";

import "../../CSS/SideBar.css";
import "../../CSS/Global.css";
import HeaderNavbar from "./HeaderNavbar";

const Allsidebar = ({ sidebar }) => {
  const [open, setOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // Example: Get user info from localStorage or API
    setFirstName(localStorage.getItem("firstName") || "User");
    setLastName(localStorage.getItem("lastName") || "");
    setEmail(localStorage.getItem("email") || "example@mail.com");
    setImage(localStorage.getItem("profileImage") || "");
  }, [sidebar]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const menuClass = ({ isActive }) =>
    isActive ? "main-nav-active-style" : "";

  return (
    <div>
      <HeaderNavbar />
      <div className={`${open ? "sidebar active" : "sidebar"}`}>
        <div className="logo-content">
          <div className="logo px-4 py-2"></div>

          <FontAwesomeIcon
            icon={open ? faCircleChevronLeft : faBars}
            size="1x"
            onClick={() => setOpen(!open)}
            className="menu-button"
          />
        </div>

        <div className="user-info d-flex flex-direction-row mb-3">
          <div className="mx-1">
            {image ? (
              <img
                src={image}
                width="50"
                height="50"
                style={{ borderRadius: "50%" }}
                alt="profile"
              />
            ) : (
              <Avatar
                name={`${firstName} ${lastName}`}
                size="50"
                round={true}
                color="white"
                className="avatar-style"
              />
            )}
          </div>
          <div className="mt-1 ms-2">
            <b className="first-name-last">{`${firstName} ${lastName}`}</b>
            <Tooltip title={email}>
              <p
                className="first-name-last text-truncate mb-0"
                style={{ width: "160px" }}
              >
                {email}
              </p>
            </Tooltip>
          </div>
        </div>

        {/* STUDENT SIDEBAR */}
        {userRole === "student" && (
          <div className="nav-list">
            <div className="menu-list">
              <NavLink to="/student/dashboard" className={menuClass}>
                <FontAwesomeIcon icon={faChalkboardUser} className="menu-icon" />
                Dashboard
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/update/detail" className={menuClass}>
                <FontAwesomeIcon icon={faIdCard} className="menu-icon" />
                My Profile
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/upcoming/schedule1" className={menuClass}>
                <FontAwesomeIcon icon={faCalendarCheck} className="menu-icon" />
                Upcoming Schedule
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/allcourselist" className={menuClass}>
                <FontAwesomeIcon icon={faBook} className="menu-icon" />
                Courses
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/list" className={menuClass}>
                <FontAwesomeIcon icon={faStar} className="menu-icon" />
                Favourite Courses
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/quiz" className={menuClass}>
                <FontAwesomeIcon icon={faLightbulb} className="menu-icon" />
                Quiz
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/homework" className={menuClass}>
                <FontAwesomeIcon icon={faHouseCircleCheck} className="menu-icon" />
                Home Work
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/transcript" className={menuClass}>
                <FontAwesomeIcon icon={faScroll} className="menu-icon" />
                Transcript
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/activecourses" className={menuClass}>
                <FontAwesomeIcon icon={faBookOpenReader} className="menu-icon" />
                Active Course
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/forum/detail" className={menuClass}>
                <FontAwesomeIcon icon={faUserGroup} className="menu-icon" />
                Forum
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/completecourse" className={menuClass}>
                <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
                Completed Course
              </NavLink>
            </div>

            <div className="menu-list">
              <NavLink to="/student/course/history" className={menuClass}>
                <FontAwesomeIcon icon={faFileCircleCheck} className="menu-icon" />
                Course History
              </NavLink>
            </div>

            <div className="menu-list">
              <button className="logout-btn" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} className="menu-icon" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* TEACHER SIDEBAR */}
        {userRole === "teacher" && (
          <div className="nav-list">
            <div className="menu-list">
              <NavLink to="/teacher/dashboard" className={menuClass}>
                <FontAwesomeIcon icon={faChalkboardUser} className="menu-icon" />
                Dashboard
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to={`/teacher/profile/${teacherId}`} className={menuClass}>
                <FontAwesomeIcon icon={faIdCard} className="menu-icon" />
                My Profile
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to={`/teacher/schedule/${teacherId}`} className={menuClass}>
                <FontAwesomeIcon icon={faClipboardCheck} className="menu-icon" />
                Schedule List
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/upcoming/schedule/list" className={menuClass}>
                <FontAwesomeIcon icon={faCalendarCheck} className="menu-icon" />
                Upcoming Schedule
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/review/quiz" className={menuClass}>
                <FontAwesomeIcon icon={faLightbulb} className="menu-icon" />
                Quiz Review
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/homework/review" className={menuClass}>
                <FontAwesomeIcon icon={faHouseCircleCheck} className="menu-icon" />
                Homework Review
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/not-available/time" className={menuClass}>
                <FontAwesomeIcon icon={faUserPlus} className="menu-icon" />
                Teacher Availability
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/forum/details" className={menuClass}>
                <FontAwesomeIcon icon={faUserGroup} className="menu-icon" />
                Forum
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/teacher/payments" className={menuClass}>
                <FontAwesomeIcon icon={faMoneyCheckDollar} className="menu-icon" />
                Payments
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink className="logout-btn" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} className="menu-icon" />
                Logout
              </NavLink>
            </div>
          </div>
        )}

        {/* ADMIN SIDEBAR */}
        {userRole === "admin" && (
          <div className="nav-list">
            <div className="menu-list">
              <NavLink to="/admin/dashboard" className={menuClass}>
                <FontAwesomeIcon icon={faChalkboardUser} className="menu-icon" />
                Dashboard
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/course/list" className={menuClass}>
                <FontAwesomeIcon icon={faBook} className="menu-icon" />
                Courses
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/course/category" className={menuClass}>
                <FontAwesomeIcon icon={faBookOpen} className="menu-icon" />
                Course Category
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/course/search" className={menuClass}>
                <FontAwesomeIcon icon={faBookReader} className="menu-icon" />
                Course Search
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/upcoming/schedule/list" className={menuClass}>
                <FontAwesomeIcon icon={faBookBookmark} className="menu-icon" />
                Upcoming Schedule
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/students/list" className={menuClass}>
                <FontAwesomeIcon icon={faUserPlus} className="menu-icon" />
                Students
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/teacher/list" className={menuClass}>
                <FontAwesomeIcon icon={faPersonChalkboard} className="menu-icon" />
                Teachers
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/forum" className={menuClass}>
                <FontAwesomeIcon icon={faPeopleLine} className="menu-icon" />
                Forums
              </NavLink>
            </div>
            <div className="menu-list">
              <NavLink to="/admin/payment/list" className={menuClass}>
                <FontAwesomeIcon icon={faMoneyCheckDollar} className="menu-icon" />
                Student Payments
              </NavLink>
            </div>
            <div className="menu-list">
              <button className="logout-btn" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} className="menu-icon" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allsidebar;
