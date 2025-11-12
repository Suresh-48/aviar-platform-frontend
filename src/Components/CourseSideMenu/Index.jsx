import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// Style
import "../../CSS/CourseMenu.css";
import { useNavigate } from "react-router-dom";

const CourseSideMenu = (props) => {
     const { id } = useParams();
  const { courseID } = useParams();
  const [courseId, setcourseId] = useState(props.courseID);
  const [lessonId] = useState(id);
  //   const history = useHistory();
  console.log("Lesson 123", id);
  console.log("CourseID 123", courseID);
  // console.log("lessonId in side menu", lessonId);
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center">
      {courseID && id ? (
        <Row className="sidenav">
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={`/course/lesson/edit/${lessonId}`
                // state: { lessonId: lessonId, courseId: courseId },
              }
              activeClassName="main-nav-active"
            >
              Edit Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
              to={`/quiz/create`
                // state: {
                //   lessonId: lessonId,
                //   courseId: courseId,
                // },
              }
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
                  courseID: courseID,
                },
              }}

              activeClassName="main-nav-active"
            >
              Home Work
            </NavLink>

          </Col>

        </Row>
      ) : (
        <Row className="sidenav">

          {console.log("lessonId", lessonId, "courseId", courseID)}
          <Col xs={12} sm={4} className="nav-border-style px-0">
            {/* <NavLink
              exact
              to=
                // pathname: "/admin/course/edit/:id",
                // state: { courseId: courseId },
                 {`/admin/course/edit/${courseId}`}
              activeClassName="main-nav-active"
            >
              Edit
            </NavLink> */}
        <NavLink
    to={`/admin/course/edit/${courseID}`}
  // state={{ courseID: courseID }} // 👈 send courseID as state
  className="navigate-edit-text-NavLink"
  onClick={() => setOpen(false)}
>
  Edit
</NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              exact
             to={`/admin/course/lesson/${courseID}`}
          //  state={{ courseID: courseID }}
              activeClassName="main-nav-active"
            >
              Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="px-0">
            <NavLink
              exact
                      to={`/admin/course/schedule/${courseID}`}
          //  state={{ courseID: courseID }}
              activeClassName="main-nav-active"
            >
              Schedule
            </NavLink>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default CourseSideMenu;
