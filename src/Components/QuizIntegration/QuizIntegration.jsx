import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

// Style
import "../../css/QuizIntegration.css";

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
  const [activeQuestionType, setActiveQuestionType] = useState(null);
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
    setActiveQuestionType(type);
  };

  const getQuestionTypeStyle = (type) => {
    const baseStyle = {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '6px',
      padding: '12px 8px',
      margin: '2px',
      border: '1px solid #dee2e6',
      fontSize: '14px',
      fontWeight: '500'
    };

    if (activeQuestionType === type) {
      return {
        ...baseStyle,
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#0056b3',
        fontWeight: '600'
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'white',
      color: '#495057',
      borderColor: '#dee2e6'
    };
  };

  // Show error if lessonId is not available
  if (!lessonId) {
    return (
      <div className="mx-3 mt-1">
        <CourseSideMenu />
        <div className="alert alert-danger mt-3 text-center">
          <h5>Error: Lesson information not found</h5>
          <p>Please go back and select a lesson first.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-primary mt-2"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderQuestionComponent = () => {
    switch (activeQuestionType) {
      case 'text':
        return <TextBox courseId={courseId} lessonId={lessonId} />;
      case 'radio':
        return <RadioButton courseId={courseId} lessonId={lessonId} />;
      case 'checkbox':
        return <CheckBox courseId={courseId} lessonId={lessonId} />;
      case 'file':
        return <FileUpload courseId={courseId} lessonId={lessonId} />;
      case 'list':
        return (
          <div className="mt-3">
            <QuestionsList courseId={courseId} lessonId={lessonId} />
          </div>
        );
      default:
        return (
          <Card className="text-center mt-4 shadow-sm">
            <Card.Body className="py-5">
              <div className="text-muted">
                <i className="fas fa-question-circle fa-3x mb-3"></i>
                <h5>
                  {questionListLength > 0 
                    ? "Select a question type to create new questions or view existing ones!" 
                    : "Get started by selecting a question type to create your first question!"
                  }
                </h5>
                <p className="mb-0">Choose from the options above to begin creating your quiz.</p>
              </div>
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <div className="mx-3 mt-1">
      <CourseSideMenu lessonId={lessonId} courseId={courseId} />
      
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main">
          {/* Header Section */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="py-3">
              <Row className="align-items-center">
                <Col xs={12} lg={6}>
                  <div className="lesson-info">
                    <h6 className="mb-1 text-primary fw-bold">
                      {lessonData?.courseId?.category?.name} 
                      <span className="mx-2">•</span>
                      {lessonData?.courseId?.name} 
                      <span className="mx-2">•</span>
                      {lessonData?.lessonName}
                    </h6>
                    <small className="text-muted">
                      Lesson ID: {lessonId}
                    </small>
                  </div>
                </Col>
                <Col xs={12} lg={6}>
                  <div className="quiz-header-section text-center text-lg-end">
                    <div className="d-flex justify-content-center justify-content-lg-end align-items-center mb-2">
                      <img src={QuizImage} alt="Quiz" width={60} height={50} />
                    </div>
                    <h4 className="mb-0 fw-bold" style={{ color: "#1c1364" }}>
                      Create Questions For Quiz
                    </h4>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Question Type Selection - Horizontal Tabs */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="py-3">
              <Row className="g-1">
                <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
                  <div
                    className="text-center question-tab"
                    style={getQuestionTypeStyle('text')}
                    onClick={() => handleQuestionTypeClick('text')}
                  >
                    Text Input
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
                  <div
                    className="text-center question-tab"
                    style={getQuestionTypeStyle('radio')}
                    onClick={() => handleQuestionTypeClick('radio')}
                  >
                    Options
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
                  <div
                    className="text-center question-tab"
                    style={getQuestionTypeStyle('checkbox')}
                    onClick={() => handleQuestionTypeClick('checkbox')}
                  >
                    Multiple Choice
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
                  <div
                    className="text-center question-tab"
                    style={getQuestionTypeStyle('file')}
                    onClick={() => handleQuestionTypeClick('file')}
                  >
                    File Upload
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} className="mb-2">
                  <div
                    className="text-center question-tab"
                    style={getQuestionTypeStyle('list')}
                    onClick={() => handleQuestionTypeClick('list')}
                  >
                    Created Questions ({questionListLength})
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Divider Line */}
          <hr className="my-4 border-2" />

          {/* Dynamic Content Area */}
          <div className="content-area">
            {renderQuestionComponent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizIntegration;