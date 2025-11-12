import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faBars,
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
import Avatar from "react-avatar";
import { NavLink, useNavigate } from "react-router-dom";
import "../../CSS/SideBar.css";
import "../../CSS/Global.css";
import "./sideBar.css"

const Allsidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const teacherId = localStorage.getItem("teacherId");

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    }
  };

  const sidebarWidth = open ? "250px" : "70px";

  // Tooltip helper
  const renderLabel = (label) => (open ? label : <span className="tooltip-text">{label}</span>);

  return (
    <div
      className="sidebar-container"
      style={{
        width: sidebarWidth,
        background: "#1a1d24",
        color: "#fff",
        transition: "width 0.3s ease",
      }}
    >
      {/* Header */}
      <div className="sidebar-header">
        {open && <span className="sidebar-title">Dashboard</span>}
        <FontAwesomeIcon
          icon={open ? faChevronLeft : faBars}
          className="toggle-icon"
          style={{
            marginLeft:'10px'
          }}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Profile */}
      {/* <div className="sidebar-profile">
        <Avatar name="User Name" size="55" round={true} />
        {open && <p className="sidebar-username">User</p>}
      </div> */}

      {/* Menu Items */}
      <div className="sidebar-menu">
        {/* STUDENT MENU */}
        {userRole === "student" && (
          <>
            <SidebarLink to="/student/dashboard" icon={faChalkboardUser} open={open} label="Dashboard" />
            <SidebarLink to="/student/update/detail" icon={faIdCard} open={open} label="My Profile" />
            <SidebarLink to="/student/upcoming/schedule1" icon={faCalendarCheck} open={open} label="Upcoming Schedule" />
            <SidebarLink to="/student/allcourselist" icon={faBook} open={open} label="Courses" />
            <SidebarLink to="/student/list" icon={faStar} open={open} label="Favourite Courses" />
            <SidebarLink to="/student/quiz" icon={faLightbulb} open={open} label="Quiz" />
            <SidebarLink to="/student/homework" icon={faHouseCircleCheck} open={open} label="Homework" />
            <SidebarLink to="/student/transcript" icon={faScroll} open={open} label="Transcript" />
            <SidebarLink to="/student/activecourses" icon={faBookOpenReader} open={open} label="Active Courses" />
            <SidebarLink to="/student/forum/detail" icon={faUserGroup} open={open} label="Forum" />
            <SidebarLink to="/student/completecourse" icon={faClipboardList} open={open} label="Completed Courses" />
            <SidebarLink to="/student/course/history" icon={faFileCircleCheck} open={open} label="Course History" />
            <SidebarButton onClick={logout} icon={faPowerOff} open={open} label="Logout" />
          </>
        )}

        {/* TEACHER MENU */}
        {userRole === "teacher" && (
          <>
            <SidebarLink to="/teacher/dashboard" icon={faChalkboardUser} open={open} label="Dashboard" />
            <SidebarLink to={`/teacher/profile/${teacherId}`} icon={faIdCard} open={open} label="My Profile" />
            <SidebarLink to={`/teacher/schedule/${teacherId}`} icon={faClipboardCheck} open={open} label="Schedule List" />
            <SidebarLink to="/teacher/upcoming/schedule/list" icon={faCalendarCheck} open={open} label="Upcoming Schedule" />
            <SidebarLink to="/teacher/review/quiz" icon={faLightbulb} open={open} label="Quiz Review" />
            <SidebarLink to="/teacher/homework/review" icon={faHouseCircleCheck} open={open} label="Homework Review" />
            <SidebarLink to="/teacher/not-available/time" icon={faUserPlus} open={open} label="Availability" />
            <SidebarLink to="/teacher/forum/details" icon={faUserGroup} open={open} label="Forum" />
            <SidebarLink to="/teacher/payments" icon={faMoneyCheckDollar} open={open} label="Payments" />
            <SidebarButton onClick={logout} icon={faPowerOff} open={open} label="Logout" />
          </>
        )}

        {/* ADMIN MENU */}
        {userRole === "admin" && (
          <>
            <SidebarLink to="/admin/dashboard" icon={faChalkboardUser} open={open} label="Dashboard" />
            <SidebarLink to="/admin/course/list" icon={faBook} open={open} label="Courses" />
            <SidebarLink to="/admin/course/category" icon={faBookOpen} open={open} label="Course Category" />
            <SidebarLink to="/admin/course/search" icon={faBookReader} open={open} label="Course Search" />
            <SidebarLink to="/admin/upcoming/schedule/list" icon={faBookBookmark} open={open} label="Upcoming Schedule" />
            <SidebarLink to="/admin/students/list" icon={faUserPlus} open={open} label="Students" />
            <SidebarLink to="/admin/teacher/list" icon={faPersonChalkboard} open={open} label="Teachers" />
            <SidebarLink to="/admin/forum" icon={faPeopleLine} open={open} label="Forums" />
            <SidebarLink to="/admin/payment/list" icon={faMoneyCheckDollar} open={open} label="Student Payments" />
            <SidebarButton onClick={logout} icon={faPowerOff} open={open} label="Logout" />
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */
const SidebarLink = ({ to, icon, label, open }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `sidebar-link ${isActive ? "active" : ""}`
    }
    title={!open ? label : ""}
  >
    <FontAwesomeIcon icon={icon} className="sidebar-icon" />
    {open && <span>{label}</span>}
  </NavLink>
);

const SidebarButton = ({ onClick, icon, label, open }) => (
  <button className="sidebar-link logout" onClick={onClick} title={!open ? label : ""}>
    <FontAwesomeIcon color="black" icon={icon} className="sidebar-icon" />
    {open && <span style={{color:'black'}}>{label}</span>}
  </button>
);

export default Allsidebar;
