import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";
// Styles
import "../../CSS/SideBar.css";
import aviar from "../../Images/aviar.png";
import PublicFooter from "../PublicLayout/PublicFooter";
// Icons
import "../../CSS/Global.css"
import HeaderNavbar from "./HeaderNavbar";
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
  faMoneyCheckDollar,
  faBookOpenReader,
  faClipboardList,
  faFileCircleCheck,
  faPersonCircleCheck,
  // faBookOpen,
  faBookReader,
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
const Allsidebar = ({ onClick,sidebar }) => {
  const[open,setOpen] = useState(true)
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
        <div className={`${open ? "sidebar active" : "sidebar"}`}>
          <div className="logo-content">
            <div className="logo px-4 py-2 ">
              {/* <img src={Kharpi} alt="Kharphi" width={"80%"} height={"100%"} /> */}
            </div>


            {open === true ? (
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                size="1x"
                onClick={() => {
                  setOpen(!open);
                }}
                className="menu-button "
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                  setOpen(!open);
                }}
                className="menu-button "
              />
            )}
          </div>
          <div>
            <div>
              <div className="d-flex flex-direction-row mb-3">
                <div className="mx-1">
                  {image ? (
                    <img src={image} width="50" height="50" style={{ borderRadius: "50%" }} />
                  ) : (
                    <Avatar
                      name={`${firstName} ${lastName}`}
                      size="50"
                      onClick={() => setshow(!show)}
                      round={true}
                      color="white"
                      className="avatar-style"
                    />
                  )}
                </div>
                <div className="mt-1 ms-2">
                  <b className="first-name-last">{firstName + " " + lastName}</b>
                  <br />
                  <Tooltip className="email-tooltip" title={userDetails.email}>
                    <p
                      className="first-name-last text-truncate mb-0"
                      style={{
                        display: "block",
                        width: "160px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={userDetails.email}
                    >
                      {email}
                    </p>
                  </Tooltip>
                </div>
              </div>

              {/* Student DashBoard */}
              <div className="nav-list">
                <div className="menu-list">
                  <NavLink to="/student/dashboard" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faChalkboardUser} className="menu-icon" title="Dashboard" size="1x" />
                    Dashboard
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink to="/student/update/detail" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faIdCard} title="My Profile" size="1x" className="menu-icon" />
                    My Profile
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/upcoming/schedule1" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      title="Upcoming Schedule"
                      className="menu-icon"
                      size="1x"
                    />
                    Upcoming Schedule
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/allcourselist" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faBook} title="Courses" className="menu-icon" size="1x" />
                    Courses
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/list" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faStar} title="Favourite Course" className="menu-icon" size="1x" />
                    Favourite Courses
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/quiz" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faLightbulb} title="Quiz" className="menu-icon me-1" />
                    Quiz
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/homework" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faHouseCircleCheck}
                      title="Home Work"
                      className="menu-icon"
                      size="1x"
                    />
                    Home Work
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/transcript" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon icon={faScroll} title="Transcript" className="menu-icon" size="1x" />
                    Transcript
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/activecourses" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faBookOpenReader}
                      title="Active Course"
                      className="menu-icon"
                      size="1x"
                    />
                    Active Course
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/forum/detail" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      title="Completed Course"
                      className="menu-icon"
                      size="1x"
                    />
                    Forum
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/completecourse" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      title="Completed Course"
                      className="menu-icon"
                      size="1x"
                    />
                    Completed Course
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink exact to="/student/course/history" activeClassName="main-nav-active-style">
                    <FontAwesomeIcon
                      icon={faFileCircleCheck}
                      title="Course History"
                      className="menu-icon"
                      size="1x"
                    />
                    Course History
                  </NavLink>
                </div>
                <div className="menu-list">
                  <NavLink
                    exact
                    to="#"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <FontAwesomeIcon icon={faPowerOff} title="Logout" className="menu-icon" size="1x" />
                    Logout
                  </NavLink>
                </div>
              </div>
            </div>
            {/* teacher approval */}
            <div div className="nav-list">
              <div className="menu-list">
                <NavLink exact to="/teacher/application/details" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon
                    icon={faPersonCircleCheck}
                    title="Teacher Application"
                    className="menu-icon"
                    size="1x"
                  />
                  Teacher Application
                </NavLink>
              </div>
            </div>
            teacher review
            <div div className="nav-list">
              <div className="menu-list">
                <NavLink exact to="/teacher/application/details" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon
                    icon={faPersonCircleCheck}
                    title="Teacher Application"
                    className="menu-icon"
                    size="1x"
                  />
                  Teacher Application
                </NavLink>
              </div>
            </div>
            teacher reject
            <div className="nav-list">
              <div className="menu-list">
                <NavLink exact to="/teacher/application/details"activeClassName="main-nav-active-style">
                  <FontAwesomeIcon
                    icon={faPersonCircleCheck}
                    title="Teacher Application"
                    className="menu-icon"
                    size="1x"
                  />
                  Teacher Application
                </NavLink>
              </div>
            </div>
            <div className="nav-list">
              <div className="menu-list">
                <NavLink exact to="/teacher/dashboard" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faChalkboardUser} title="Dashboard" className="menu-icon" size="1x" />
                  Dashboard
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/profile" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faIdCard} title="My Profile" className="menu-icon" size="1x" />
                  My Profile
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/schedule" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faClipboardCheck} title="Schedeule List" className="menu-icon" size="1x" />
                  Schedeule List
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/upcoming/schedule/list" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    title="Upcoming Schedeule"
                    className="menu-icon"
                    size="1x"
                  />
                  Upcoming Schedule
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/review/quiz" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faLightbulb} title="Quiz" className="menu-icon" size="1x" />
                  Quiz
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/homework/review" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faHouseCircleCheck} title="Homework" className="menu-icon" size="1x" />
                  Homework
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/not-available/time" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faUserPlus} title="Teacher Availability" className="menu-icon" size="1x" />
                  Teacher Availability
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/forum/details" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faUserGroup} title="Forum" className="menu-icon" size="1x" />
                  Forum
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/teacher/payments" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faMoneyCheckDollar} className="menu-icon" size="1x" />
                  Payments
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink
                  exact
                  to="#"
                  onClick={() => {
                    logout();
                  }}
                >
                  <FontAwesomeIcon icon={faPowerOff} title="Logout" className="menu-icon" size="1x" />
                  Logout
                </NavLink>
              </div>
            </div>

                  {/* Admin DashBoard */}
            <div className="nav-list">
              <div className="menu-list">
                <NavLink exact to="/admin/dashboard" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faChalkboardUser} title="Dashboard" className="menu-icon" size="1x" />
                  Dashboard
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/course/list" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faBook} title="Courses" className="menu-icon" size="1x" />
                  Courses
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/coursecategory" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faBookOpen} title="Course Category" className="menu-icon" size="1x" />
                  Course Category
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/course/search" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faBookReader} title="Course Search" className="menu-icon" size="1x" />
                  Course Search
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/upcoming/schedule/list" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faBookBookmark} title="Upcoming Schedules" className="menu-icon" size="1x" />
                  Upcoming Schedule
                </NavLink>
              </div>

              <div className="menu-list">
                <NavLink exact to="/admin/students/list" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faUserPlus} title="Students" className="menu-icon" size="1x" />
                  Students
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink
                  exact
                  to={{
                    pathname: "/admin/teacher/list",
                    state: {
                      indexCount: 0,
                    },
                  }}
                  activeClassName="main-nav-active-style"
                >
                  <FontAwesomeIcon icon={faPersonChalkboard} title="Teachers" className="menu-icon" size="1x" />
                  Teachers
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/forum" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon icon={faPeopleLine} title="Forums" className="menu-icon" size="1x" />
                  Forums
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink exact to="/admin/payment/list" activeClassName="main-nav-active-style">
                  <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    title="Student Payment"
                    className="menu-icon"
                    size="1x"
                  />
                  Student Payments
                </NavLink>
              </div>
              <div className="menu-list">
                <NavLink
                  exact
                  to="#"
                  onClick={() => {
                    logout();
                  }}
                >
                  <FontAwesomeIcon icon={faPowerOff} title="Logout" className="menu-icon" size="1x" />
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    
  )
}
export default Allsidebar;