import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

// Style
// import "../../css/QuizIntegration.css";

// Component
import TextBox from "./TextBox";
import RadioButton from "./RadioButton";
import FileUpload from "./FileUpload";
import CheckBox from "./CheckBox";
import QuestionsList from "./QuestionsList";
import QuizImage from "./quizImage.png";
import CourseSideMenu from "../CourseSideMenu";
import Loader from "../core/Loader";

// Api
import Api from "../../Api";
import { toast } from "react-toastify";

const QuizIntegration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [courseId, setCourseId] = useState(location.state?.courseId);
  const [lessonId, setLessonId] = useState(location.state?.lessonId);
  const [textBox, setTextBox] = useState(false);
  const [radioButton, setRadioButton] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [questionList, setQuestionList] = useState(false);
  const [questionListLength, setQuestionListLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonData, setLessonData] = useState([]);

  useEffect(() => {
    if (lessonId) {
      questionLists();
      lessonDetails();
    } else {
      setIsLoading(false);
    }
  }, [lessonId]);

  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  const questionLists = () => {
    const userId = localStorage.getItem("userId");
    Api.get("api/v1/lessonQuiz/list", {
      params: {
        courseLessonId: lessonId,
        userId: userId,
      },
    })
      .then((res) => {
        const data = res.data.quizData;
        const questionListLength = data.length;
        setQuestionListLength(questionListLength);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
        setIsLoading(false);
      });
  };

  const lessonDetails = () => {
    const userId = localStorage.getItem("userId");
    Api.get(`api/v1/courseLesson/get/one/${lessonId}`, { 
      headers: { userId: userId } 
    })
      .then((res) => {
        const lessonData = res.data.lessonList;
        setLessonData(lessonData);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const handleQuestionTypeClick = (type) => {
    // Reset all states
    setTextBox(false);
    setRadioButton(false);
    setCheckBox(false);
    setFileUpload(false);
    setQuestionList(false);

    // Set the selected type
    switch (type) {
      case 'text':
        setTextBox(true);
        break;
      case 'radio':
        setRadioButton(true);
        break;
      case 'checkbox':
        setCheckBox(true);
        break;
      case 'file':
        setFileUpload(true);
        break;
      case 'list':
        setQuestionList(true);
        break;
      default:
        break;
    }
  };

  // Show error if lessonId is not available
  if (!lessonId) {
    return (
      <div className="mx-3 mt-1">
        <CourseSideMenu />
        <div className="alert alert-danger mt-3">
          <h5>Error: Lesson information not found</h5>
          <p>Please go back and select a lesson first.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 mt-1">
      <CourseSideMenu lessonId={lessonId} courseId={courseId} />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="main">
            <Row className="mx-3 mt-3 d-flex justify-content-start align-items-center">
              <Col xs={12} sm={12} md={12} lg={6} className="mt-1">
                <div className="d-flex lesson-name">
                  <p className="mb-0 ps-3 fw-bold">
                    {lessonData?.courseId?.category?.name} - {lessonData?.courseId?.name} - {lessonData?.lessonName}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="pb-2 d-flex justify-content-center align-items-center">
              <Col xs={12} sm={12} md={12} lg={6} className="mt-1 text-center">
                <img src={QuizImage} alt="Quiz" width={"18%"} height={80} />
                <h6 style={{ color: "#1c1364" }}>Create Questions For Quiz</h6>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}></Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12} sm={6} md={2} className="question-type mb-2">
                <p
                  className="px-4 textbox-style text-center"
                  onClick={() => handleQuestionTypeClick('text')}
                  style={{ cursor: 'pointer' }}
                >
                  Text Input
                </p>
              </Col>
              <Col xs={12} sm={6} md={2} className="question-type mb-2">
                <p
                  className="px-4 textbox-style text-center"
                  onClick={() => handleQuestionTypeClick('radio')}
                  style={{ cursor: 'pointer' }}
                >
                  Options
                </p>
              </Col>
              <Col xs={12} sm={6} md={2} className="question-type mb-2">
                <p
                  className="px-4 textbox-style text-center"
                  onClick={() => handleQuestionTypeClick('checkbox')}
                  style={{ cursor: 'pointer' }}
                >
                  Multiple Choice
                </p>
              </Col>
              <Col xs={12} sm={6} md={2} className="question-type mb-2">
                <p
                  className="px-4 textbox-style text-center"
                  onClick={() => handleQuestionTypeClick('file')}
                  style={{ cursor: 'pointer' }}
                >
                  File Upload
                </p>
              </Col>
              <Col xs={12} sm={6} md={4} className="question-list mb-2">
                <p
                  className="px-4 textbox-style text-center"
                  onClick={() => handleQuestionTypeClick('list')}
                  style={{ cursor: 'pointer' }}
                >
                  Created Questions ({questionListLength})
                </p>
              </Col>
            </Row>
            <hr className="end-line" />
            
            {/* Render the selected question type component */}
            {textBox && <TextBox courseId={courseId} lessonId={lessonId} />}
            {radioButton && <RadioButton courseId={courseId} lessonId={lessonId} />}
            {checkBox && <CheckBox courseId={courseId} lessonId={lessonId} />}
            {fileUpload && <FileUpload courseId={courseId} lessonId={lessonId} />}
            {questionList && (
              <div className="justify-content-center mt-1">
                <QuestionsList courseId={courseId} lessonId={lessonId} />
              </div>
            )}
            
            {/* Default view when no question type is selected */}
            {!textBox && !radioButton && !checkBox && !fileUpload && !questionList && (
              <div className="d-flex justify-content-center mt-5">
                <h6>
                  {questionListLength > 0 
                    ? "Please select a question type to create new questions or view existing ones!" 
                    : "Please select a question type to create questions!"
                  }
                </h6>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizIntegration;