import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

// Styles
import "../../css/SideBar.scss";
import aviar from "../Images/aviar.png";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

// Roles
import { ROLES_STUDENT, ROLES_ADMIN, ROLES_TEACHER } from "../../Constants/Role";

// Api
// import Api from "../../Api";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
const DashboardSidebar = ({ onClick, open, sidebar }) => {
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
    const navigate = useNavigate();
    // const pathName = history.location.pathname;
    const isParent = role === ROLES_PARENT;
    const isStudent = role === ROLES_STUDENT;
    const isAdmin = role === ROLES_ADMIN;
    const isTeacher = role === ROLES_TEACHER;
}
export default DashboardSidebar
