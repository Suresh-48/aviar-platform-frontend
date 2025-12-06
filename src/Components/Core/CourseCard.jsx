import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// SCSS
import "../../css/LandingPage.css";
import "../../css/CourseCard.css";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasfaHeart } from "@fortawesome/free-solid-svg-icons";
import Api from "../../Api";

// Roles
import { ROLES_ADMIN } from "../../Constants/Role";

function CourseCard({ course, key, reload, onClick }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [courseId, setCourseId] = useState(course.id ? course.id : course._id);

  const isAdmin = role === ROLES_ADMIN;

  // Convert description to plain text for display
  const getPlainTextDescription = (value) => {
    try {
      if (!value) return '';
      
      // If it's already HTML, convert to plain text
      if (typeof value === 'string' && value.includes('<')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = value;
        return tempDiv.textContent || tempDiv.innerText || '';
      }
      
      // If it's draft-js raw state, extract plain text
      try {
        const parsed = JSON.parse(value);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
          return parsed.blocks.map(block => block.text).join(' ');
        }
      } catch (e) {
        // If JSON parsing fails, return the original value
        return value;
      }
      
      return value;
    } catch (exp) {
      console.error('Error converting content:', exp);
      return 'Course description';
    }
  };

  // Log out
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      // navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  const onSubmit = (list) => {
    const userId = localStorage.getItem("userId");
    Api.post(`api/v1/favouriteCourse`, {
      courseId: list,
      userId: userId,
    })
      .then((response) => {
        reload();
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const courseLink = role ? `/student/course/detail/${course?.aliasName}` : "/login";
  const courseState = role ? { courseId: course?.id } : null;

  const description = getPlainTextDescription(course?.description);

  // Handle description click - stop propagation to prevent parent NavLink from triggering
  const handleDescriptionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (role) {
      navigate(`/student/course/detail/${course?.aliasName}`, { state: { courseId: course?.id } });
    } else {
      navigate("/login");
    }
  };

  // Handle card click (for the main NavLink area)
  const handleCardClick = (e) => {
    // Allow normal NavLink behavior for the main card area
  };

  return (
    <div key={key} className="landing-card-fis">
      <Card className="landing-card-height">
     <NavLink
  to={`/student/course/detail/${course?.aliasName}`}
  state={{ courseId: course?.id }}
  className="edit-link"
  onClick={handleCardClick}
>
          <div className="image-content">
            {course?.imageUrl === undefined || course?.imageUrl === null ? (
              <img
                className="image-heigh"
                src="https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"
                alt="Snow"
                width={"100%"}
                height={"100%"}
              />
            ) : (
              <img
                className="image-height-style"
                src={course?.imageUrl}
                alt={`${course?.category?.name}`}
                width={"100%"}
              />
            )}
          </div>

          <Card.Body className="card-body-alignments">
            <Card.Title className="truncate-text">{course?.name}</Card.Title>
          </Card.Body>
        </NavLink>

        {/* Description outside of NavLink to have separate navigation */}
        <Card.Body className="card-body-alignments" style={{ paddingTop: '0' }}>
          <Card.Text>
            <p 
              className="ellipsis-text" 
              title={description}
              onClick={handleDescriptionClick}
              style={{ 
                cursor: "pointer", 
                margin: 0,
                padding: '8px 0'
              }}
            >
              {description}
            </p>
          </Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-center align-items-center">
          <div style={{ width: "100%" }}>
            <div className="edit-link d-flex justify-content-center">
              <p className="discount-amount-text mb-0">${course?.discountAmount}</p>
              <p className="actual-amount-text mt-2 mb-0">${course?.actualAmount}</p>
            </div>
          </div>
          {isAdmin || userId == null ? null : course?.favourite === true ? (
            <FontAwesomeIcon
              icon={fasfaHeart}
              color="crimson"
              className="mb-2"
              style={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                navigate(`/student/course/detail/${course?.aliasName}`);
                onSubmit(course.id ? course.id : course._id);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={farfaHeart}
              color="black"
              className="mb-2"
              style={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => {
                navigate(`/student/course/detail/${course?.aliasName}`);
                onSubmit(course.id ? course.id : course._id);
              }}
            />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CourseCard;