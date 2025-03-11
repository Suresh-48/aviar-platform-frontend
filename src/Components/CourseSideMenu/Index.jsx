import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// Style
import "../../CSS/CourseMenu.css";
import { useNavigate} from "react-router-dom";

const CourseSideMenu = (props) => {
  const [courseId, setcourseId] = useState(props.courseId);
  const [lessonId, setlessonId] = useState(props.lessonId);
//   const history = useHistory();

  return (
    <div className="d-flex justify-content-center">
      {/* {courseId && lessonId ? ( */}
        <Row className="sidenav">
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={{
                pathname: `/course/lesson/edit/${lessonId}`,
                state: { lessonId: lessonId, courseId: courseId },
              }}
              activeClassName="main-nav-active"
            >
              Edit Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={{
                pathname: `/quiz/create`,
                state: {
                  lessonId: lessonId,
                  courseId: courseId,
                },
              }}
              activeClassName="main-nav-active"
            >
              Quiz
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="px-0">
            <NavLink
              exact
              to={{
                pathname: "/admin/homework/create",
                state: {
                  lessonId: lessonId,
                  courseId: courseId,
                },
              }}
              activeClassName="main-nav-active"
            >
              Home Works
            </NavLink>
          </Col>
        </Row>
      {/* ) : ( */}
        <Row className="sidenav">
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={{
                pathname: "/admin/course/edit/:id",
                // state: { courseId: courseId },
              }}
              activeClassName="main-nav-active"
            >
              Edit
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={{
                pathname: "/admin/course/lesson",
                state: { courseId: courseId },
              }}
              activeClassName="main-nav-active"
            >
              Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="px-0">
            <NavLink
              exact
              to={{
                pathname: "/admin/course/schedule",
                state: { courseId: courseId },
              }}
              activeClassName="main-nav-active"
            >
              Schedule
            </NavLink>
          </Col>
        </Row>
      {/* )} */}
    </div>
  );
};
export default CourseSideMenu;
