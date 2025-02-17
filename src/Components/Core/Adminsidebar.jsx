import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";
// Styles
import "../../CSS/SideBar.css";
import aviar from "../../Images/aviar.png";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
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
  faBookReader,
  faMoneyCheckDollar,
  faPersonChalkboard,
  faPenToSquare,
  faAddressCard,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";

// Roles
import { ROLES_PARENT, ROLES_STUDENT, ROLES_ADMIN, ROLES_TEACHER } from "../../Constants/Role";

// Api
// import Api from "../../Api";
import Avatar from "react-avatar";
import { toast } from "react-toastify";

const Adminsidebar = ({ onClick, open, sidebar }) => {
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
//   const history = useHistory();
//   const pathName = history.location.pathname;
  const isParent = role === ROLES_PARENT;
  const isStudent = role === ROLES_STUDENT;
  const isAdmin = role === ROLES_ADMIN;
  const isTeacher = role === ROLES_TEACHER;
  // const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // getUserDetails();
  }, [sidebarValue]);

//   useEffect(() => {
//     Api.get(`/api/v1/teacherApplication/${teacherId}`, {
//       headers: {
//         userId: userId,
//       },
//     }).then((response) => {
//       const teacherStatus = response?.data?.getTeacherApplication?.status;
//       setstatus(teacherStatus);
//     });
//   }, [isTeacher]);

//   // Log out
//   const logout = () => {
//     setshow(!show);
//     setTimeout(() => {
//       localStorage.clear(history.push("/kharpi"));
//       window.location.reload();
//       getUserDetails();
//     }, 2000);
//   };

  //get details
//   const getUserDetailsz = () => {
//     let role = localStorage.getItem("role");
//     let userId = localStorage.getItem("userId");
//     let studentId = localStorage.getItem("studentId");
//     let teacherId = localStorage.getItem("teacherId");
//     setuserId(userId);
//     setrole(role);
//     setstudentId(studentId);
//     setTeacherId(teacherId);
    // Api.get(`api/v1/user/${userId}`, { headers: { userId: userId } }).then((response) => {
    //   const userDetails = response.data.data.getOne;
    //   setuserDetails(userDetails);
    //   setfirstName(userDetails.firstName);
    //   setlastName(userDetails.lastName);
    //   setEmail(userDetails.email);
    //   const parentId = userDetails.parentId;
    //   const studentId = userDetails.studentId;
    //   const teacherId = userDetails.teacherId;
    //   setCheckPassword(userDetails.password || userDetails.password !== undefined ? true : false);

    //   Api.get(
    //     `api/v1/${(parentId && studentId) || studentId ? "student" : parentId ? "parent" : "teacher"}/${
    //       (parentId && studentId) || studentId ? studentId : parentId ? parentId : teacherId
    //     }`,
//         { headers: { userId: userId } }
//       ).then((response) => {
//         const getImageDetails = response?.data?.data?.getOne?.imageUrl;
//         setImage(getImageDetails);
//       });
//     });
//   };

  return ( 
    <div>
      <div>
        <div className={`${open ? "sidebar" : "sidebar active"}`}>
          <div className="logo-content">
            <div className="logo px-4 py-2 ">
              <img src={aviar} alt="Kharphi" width={"80%"} height={"100%"} />
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
            {/* ) : ( */}
              {/* <FontAwesomeIcon
                icon={faCircleChevronLeft}
                onClick={() => {
                  onClick(!open);
                }}
                className="menu-button "
              /> */}
            {/* )} */}
          </div>
          <div>
            {/* {isParent === true || isStudent === true ? ( */}
              <div className="nav-list">
                {/* {isStudent ? (
                  isStudent && checkPassword ? ( */}
                    <div>
                      <div className="d-flex flex-direction-row mb-3">
                        <div className="mx-1">
                          {/* {image ? (
                            <img src={image} width="50" height="50" style={{ borderRadius: "50%" }} />
                          ) : ( */}
                            {/* <Avatar
                              name={`${firstName} ${lastName}`}
                              size="50"
                              onClick={() => setshow(!show)}
                              round={true}
                              color="white"
                              className="avatar-style"
                            /> */}
                          {/* )} */}
                        </div>
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
                          <FontAwesomeIcon icon={faChalkboardUser} className="menu-icon me-3" title="Dashboard" size="1x" />
                          
                          Dashboard
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink to={`/edit/student/details/${studentId}`} activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon icon={faBookOpen} title="Course Category" size="1x" className="menu-icon me-3" />
                          Course Category
                        
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink to={`/edit/student/details/${studentId}`} activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon icon={faBookOpenReader} title="Course Search" size="1x" className="menu-icon me-3" />
                          Course Search
                        
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink exact to="/upcoming/schedule" activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon
                            icon={faCalendarCheck}
                            title="Upcoming Schedule"
                            className="menu-icon me-3"
                            size="1x"
                          />
                          Upcoming Schedule
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink exact to="/course/search" activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon icon={faBook} title="Students" className="menu-icon me-3" size="1x" />
                          Students
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink exact to="/favourite/course" activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon icon={faPersonChalkboard} title="Teachers" className="menu-icon me-3" size="1x" />
                          Teachers
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink exact to="/forum/details" activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon
                            icon={faUserGroup}
                            title="Forum"
                            className="menu-icon me-3"
                            size="1x"
                          />
                          Forum
                        {/* </NavLink> */}
                      </div>
                      <div className="menu-list">
                        {/* <NavLink exact to="/test/link" activeClassName="main-nav-active-style"> */}
                          <FontAwesomeIcon icon={faMoneyCheckDollar} title="Students payment" className="menu-icon me-3" />
                       
                          Students payment
                        {/* </NavLink> */}
                      </div>
                    
                      <div className="menu-list">
                        {/* <NavLink
                          exact
                          to="#"
                          onClick={() => {
                            logout();
                          }}
                        > */}
                          <FontAwesomeIcon icon={faPowerOff} title="Logout" className="menu-icon me-3" size="1x" />
                          Logout
                        {/* </NavLink> */}
                      </div>
                      <div>
                      </div>
                      </div>
                    </div>
                 
          </div>
        </div>
      </div>
      
    </div>
  )
};

export default Adminsidebar;
