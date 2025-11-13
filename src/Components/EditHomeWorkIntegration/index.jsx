import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import QuizImage from "../../components/QuizIntegration/quizImage.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";

// Api
import Api from "../../Api";

// Component
import Loader from "../core/Loader";

const EditHomeWorkIntegration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [type, setType] = useState(location.state?.type);
  const [homeworkId, setHomeworkId] = useState(location.state?.homeworkId);
  const [questionNumber, setQuestionNumber] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [checkBox1, setCheckBox1] = useState("");
  const [checkBox2, setCheckBox2] = useState("");
  const [checkBox3, setCheckBox3] = useState("");
  const [checkBox4, setCheckBox4] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //logout
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem("userId");
    setIsSubmit(true);
    Api.patch(`api/v1/lessonHomework/lesson/update`, {
      lessonHomeworkId: homeworkId,
      courseId: courseId,
      courseLessonId: lessonId,
      question: question,
      questionNumber: questionNumber,
      type: type,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      checkBox1: checkBox1,
      checkBox2: checkBox2,
      checkBox3: checkBox3,
      checkBox4: checkBox4,
      userId: userId,
    })
      .then((response) => {
        toast.success("Updated Successfully");
        setQuestionNumber("");
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCheckBox1("");
        setCheckBox2("");
        setCheckBox3("");
        setCheckBox4("");
        setIsSubmit(false);
        navigate(-1); // Go back instead of props.history.goBack()
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message || "Failed to update homework");
          setIsSubmit(false);
        }

        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          toast.error("Failed to update homework");
          setIsSubmit(false);
        }
      });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const questionList = () => {
    const userId = localStorage.getItem("userId");
    Api.get(`api/v1/lessonHomework/${location.state?.homeworkId}`, {
      params: {
        courseLessonId: lessonId,
        userId: userId,
      },
    })
      .then((res) => {
        const data = res.data.data.getOne;
        setQuestionNumber(data.questionNumber);
        setQuestion(data.question);
        setOption1(data?.option1 || "");
        setOption2(data?.option2 || "");
        setOption3(data?.option3 || "");
        setOption4(data?.option4 || "");
        setCheckBox1(data?.checkBox1 || "");
        setCheckBox2(data?.checkBox2 || "");
        setCheckBox3(data?.checkBox3 || "");
        setCheckBox4(data?.checkBox4 || "");
        setCourseId(data.courseId);
        setLessonId(data.courseLessonId);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          toast.error("Failed to load homework data");
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (homeworkId) {
      questionList();
    } else {
      setIsLoading(false);
      toast.error("Homework ID not found");
    }
  }, [homeworkId]);

  // Show error if homeworkId is not available
  if (!homeworkId) {
    return (
      <div className="p-3">
        <div className="alert alert-danger text-center">
          <h5>Error: Homework information not found</h5>
          <p>Please go back and select a homework to edit.</p>
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

  return (
    <div className="p-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Row className="pb-2 d-flex justify-content-center align-items-center">
            <Col xs={12} sm={6}>
              <div className="d-flex align-items-center mb-2">
                <img src={QuizImage} alt="Homework" width={"18%"} height={80} />
                <h6 className="ms-3 mb-0" style={{ color: "#1C1364" }}>Edit Questions For Home Work</h6>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="d-flex justify-content-end">
                <h6>Lesson 1 - </h6>
                <p className="mb-0 ms-2"> Introduction of Classical Music</p>
              </div>
            </Col>
          </Row>
          {type === "text" ? (
            <div className="input-style mt-3">
              <div className="px-4">
                <h6>Input Type Question Format</h6>
              </div>
              <div className="px-2">
                <div className="d-flex">
                  <TextField
                    fullWidth
                    className="mt-4"
                    multiline
                    name="question"
                    id="filled-basic"
                    value={question}
                    label="Enter Your Question"
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    variant="filled"
                  />
                </div>
                <Form>
                  <Form.Group className="mt-4 mx-2" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      disabled
                      as="textarea"
                      rows={3}
                      placeholder="Enter Your Answer"
                      style={{ backgroundColor: "#F0F0F0" }}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          ) : type === "radio" ? (
            <div className="input-style mt-3">
              <div className="px-4">
                <h6>Option Question Format</h6>
              </div>
              <div className="px-2">
                <div className="d-flex">
                  <TextField
                    fullWidth
                    className="mt-4"
                    multiline
                    id="filled-basic"
                    label="Enter Your Question"
                    name="question"
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    variant="filled"
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Radio value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option1"
                    variant="standard"
                    name="option1"
                    multiline
                    fullWidth
                    value={option1}
                    onChange={(e) => {
                      setOption1(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Radio value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option2"
                    variant="standard"
                    name="option2"
                    multiline
                    fullWidth
                    value={option2}
                    onChange={(e) => {
                      setOption2(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Radio value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option3"
                    variant="standard"
                    name="option3"
                    multiline
                    fullWidth
                    value={option3}
                    onChange={(e) => {
                      setOption3(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Radio value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option4"
                    variant="standard"
                    name="option4"
                    multiline
                    fullWidth
                    value={option4}
                    onChange={(e) => {
                      setOption4(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </div>
          ) : type === "checkbox" ? (
            <div className="input-style mt-3">
              <div className="px-4">
                <h6>Multiple Choice Question Format</h6>
              </div>
              <div className="px-2">
                <div className="d-flex">
                  <TextField
                    fullWidth
                    className="mt-4"
                    multiline
                    id="filled-basic"
                    label="Enter Your Question"
                    name="question"
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    variant="filled"
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Checkbox value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option1"
                    variant="standard"
                    name="checkBox1"
                    multiline
                    fullWidth
                    value={checkBox1}
                    onChange={(e) => {
                      setCheckBox1(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Checkbox value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option2"
                    variant="standard"
                    name="checkBox2"
                    multiline
                    fullWidth
                    value={checkBox2}
                    onChange={(e) => {
                      setCheckBox2(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Checkbox value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option3"
                    variant="standard"
                    name="checkBox3"
                    multiline
                    fullWidth
                    value={checkBox3}
                    onChange={(e) => {
                      setCheckBox3(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="d-flex mt-3 options">
                  <Checkbox value="" name="radio-buttons" className="radio-options" disabled />
                  <TextField
                    id="standard-basic"
                    label="Option4"
                    variant="standard"
                    name="checkBox4"
                    multiline
                    fullWidth
                    value={checkBox4}
                    onChange={(e) => {
                      setCheckBox4(e.target.value);
                    }}
                    className="ms-3"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            type === "fileUpload" && (
              <div className="input-style mt-3">
                <div className="px-4">
                  <h6>File Upload Question Format</h6>
                </div>
                <div className="px-2">
                  <div className="d-flex">
                    <TextField
                      fullWidth
                      className="mt-4"
                      multiline
                      id="filled-basic"
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                      label="Enter Your Question"
                      variant="filled"
                    />
                  </div>
                  <Form.Group controlId="formFile" className="mt-4 mx-2">
                    <Form.Control disabled type="file" style={{ backgroundColor: "#F0F0F0" }} />
                  </Form.Group>
                </div>
              </div>
            )
          )}
          <div className="mt-3 d-flex justify-content-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
              style={{ marginRight: '10px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={question === "" || isSubmit}
              onClick={handleSubmit}
            >
              {isSubmit ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditHomeWorkIntegration;