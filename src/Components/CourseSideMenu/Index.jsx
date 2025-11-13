import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// Style
import "../../CSS/CourseMenu.css";
import { useNavigate } from "react-router-dom";

const CourseSideMenu = (props) => {
  const { id } = useParams();
  let { courseID } = useParams();
  const location = useLocation();
  const { lessonData } = location.state || {};
  courseID = courseID || lessonData?.courseId?._id;
  const [lessonId] = useState(id);
  const navigate = useNavigate();

  console.log("id ...", id);
  console.log("lesson Id ", lessonId);

  // Check if we're on a lesson-related page
  const isLessonPage = !!id;

  return (
    <div className="d-flex justify-content-center">
      {isLessonPage ? (
        // LESSON PAGE TABS
        <Row className="sidenav">
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              to={ `/admin/course/lesson/edit/${lessonId}`}
                state={{ 
                  lessonId: lessonId, 
                  courseID: courseID,
                  disableSidebar: true 
                }
              }
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
            >
              Edit Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              to= {`/admin/quiz/create/${lessonId}`}
              state={{
                lessonId: lessonId,
                courseID: courseID,
              }}
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
            >
              Quiz
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="px-0">
            <NavLink
              to="/admin/homework/create"
              state={{
                lessonId: lessonId,
                courseID: courseID,
              }}
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
            >
              Home Work
            </NavLink>
          </Col>
        </Row>
      ) : (
        // COURSE PAGE TABS
        <Row className="sidenav">
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              to={`/admin/course/edit/${courseID}`}
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
            >
              Edit
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="nav-border-style px-0">
            <NavLink
              to={`/admin/course/lesson/${courseID}`}
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
            >
              Lesson
            </NavLink>
          </Col>
          <Col xs={12} sm={4} className="px-0">
            <NavLink
              to={`/admin/course/schedule/${courseID}`}
              className={({ isActive }) => 
                `nav-link-custom ${isActive ? 'main-nav-active' : ''}`
              }
              end
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