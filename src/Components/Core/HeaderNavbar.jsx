import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

import aviar from "../../Images/aviar.png";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// Style
import "../CSS/HeaderNavbar.css";

// Roles
import {

  ROLES_STUDENT,
  ROLES_ADMIN,
  ROLES_TEACHER,
} from "../../Constants/Role";

// Api
// import Api from "../../Api";
import { NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const HeaderNavbar = ({ props, sidebar, open }) => {
  const Open = open;
  const [isOpen, setIsOpen] = useState(false);
  const sideBarvalue = sidebar;
  const [role, setrole] = useState("");
  const [userId, setuserId] = useState("");
  const [userDetails, setuserDetails] = useState("");
  const [show, setshow] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [studentId, setstudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [image, setImage] = useState("");
  const [status, setstatus] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);

//   const pathName = history.location.pathname;
  //  const navigate = useNavigate();
  const isStudent = role === ROLES_STUDENT;
  const isAdmin = role === ROLES_ADMIN;
  const isTeacher = role === ROLES_TEACHER;

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
//     getUserDetails();
  }, [sideBarvalue]);

  // Log out
  const logout = () => {
    setshow(!show);
    setTimeout(() => {
    //   localStorage.clear(history.push("/kharpi"));
      window.location.reload();
      getUserDetails();
    }, 2000);
  };

  //get details
  const getUserDetails = () => {
    let role = localStorage.getItem("role");
    let userId = localStorage.getItem("userId");
    let studentId = localStorage.getItem("studentId");
    let teacherId = localStorage.getItem("teacherId");
    setuserId(userId);
    setrole(role);
    setstudentId(studentId);
    setTeacherId(teacherId);
    // Api.get(`api/v1/user/${userId}`).then((response) => {
    //   const userDetails = response.data.data.getOne;
    //   const teacherStatus = response.data.data.teacherStatus.status;
    //   setstatus(teacherStatus);
    //   setuserDetails(userDetails);
    //   setfirstName(userDetails.firstName);
    //   setlastName(userDetails.lastName);
    //   const parentId = userDetails.parentId;
    //   const studentId = userDetails.studentId;
    //   const teacherId = userDetails.teacherId;
    //   setCheckPassword(
    //     userDetails.password || userDetails.password !== undefined
    //       ? true
    //       : false
    //   );
    //   Api.get(
    //     `api/v1/${
    //       (parentId && studentId) || studentId
    //         ? "student"
    //         : parentId
    //         ? "parent"
    //         : "teacher"
    //     }/${
    //       (parentId && studentId) || studentId
    //         ? studentId
    //         : parentId
    //         ? parentId
    //         : teacherId
    //     }`
    //   ).then((response) => {
    //     const getImageDetails = response.data.data.getOne.imageUrl;
    //     setImage(getImageDetails);
    //   });
    // });
  };
  return (
    <>
      <Navbar color="light" light expand="md" className="navbar-style">
        <Container fluid>
          {/* {Open ? ( */}
            <NavbarBrand
              className="navbarbrand-alignment"
            //   onClick={() => history.push("/kharpi", { sideClose: "closed" })}
            >
              {/* <img
                src={aviar}
                width="100"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              /> */}
            </NavbarBrand>
          {/* ) : null} */}

          <NavbarToggler onClick={toggle} />
          {!isStudent && !isTeacher && !isAdmin && (
            <Collapse
              isOpen={isOpen}
              navbar
              style={{ justifyContent: "flex-end" }}
            >
              <Nav className="mr-auto" navbar>
                {/* {pathName !== "/kharpi" && (
                  <NavItem className="ml-auto">
                    <NavLink href="/kharpi">Home Page</NavLink>
                  </NavItem>
                )} */}
                <NavItem className="">
                  <NavLink href="/about-us">About Us</NavLink>
                </NavItem>
                <NavItem className="">
                  <NavLink href="/help">Help</NavLink>
                </NavItem>
                <NavItem className="ml-auto">
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          )}
          {isStudent || isTeacher ? (
            <Collapse
              isOpen={isOpen}
              navbar
              style={{ justifyContent: "flex-end" }}
            >
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav style={{ marginRight: 20 }}>
                    {image ? (
                      <img
                        src={image}
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <Avatar
                        name={`${firstName} ${lastName}`}
                        size="40"
                        onClick={() => setshow(!show)}
                        round={true}
                        color="silver"
                        className="avatar-style"
                      />
                    )}
                  </DropdownToggle>
                
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          ) : (
            isAdmin && (
              <Collapse
                isOpen={isOpen}
                navbar
                style={{ justifyContent: "flex-end" }}
              >
                <Nav className="mr-auto" navbar>
                  <Link
                    to="#"
                    className="navigate-profile-link"
                    onClick={logout}
                    style={{ cursor: "pointer", zIndex: 0 }}
                  >
                    Logout
                  </Link>
                </Nav>
              </Collapse>
            )
          )}
        </Container>
      </Navbar>
    </>
  );
};
export default HeaderNavbar;
