import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
// Styles
import "../../css/SideBar.scss";
import Kharpi from "../core/Kharpi.jpg";

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
import { ROLES_PARENT, ROLES_STUDENT, ROLES_ADMIN, ROLES_TEACHER } from "../../Constants/Roles";

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
    const history = useHistory();
    const pathName = history.location.pathname;
    const isParent = role === ROLES_PARENT;
    const isStudent = role === ROLES_STUDENT;
    const isAdmin = role === ROLES_ADMIN;
    const isTeacher = role === ROLES_TEACHER;
}
