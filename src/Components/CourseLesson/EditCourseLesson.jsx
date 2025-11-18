import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Api
import Api from "../../Api";

// Component
import { toast } from "react-toastify";
import Loader from "../core/Loader";
import Label from "../../components/core/Label";
import CourseSideMenu from "../CourseSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

// React Quill modules configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'align',
  'link', 'image'
];

// Validation
const createLessonSchema = Yup.object().shape({
  lessonNumber: Yup.string()
    .matches(
      /^[0-9]*$/,
      "Enter Valid Lesson Number"
    )
    .required("Lesson Number Is Required"),
  lessonName: Yup.string().required("Lesson Name Is Required"),
  lessonActualAmount: Yup.string().required("Lesson Actual Amount Is Required"),
  lessonDiscountAmount: Yup.string().required(
    "Lesson Discount Amount Is Required"
  ),
  description: Yup.string()
    .required("Description Is Required")
    .test('is-not-empty', 'Description Is Required', (value) => {
      if (!value) return false;
      const plainText = value.replace(/<[^>]*>/g, '').trim();
      return plainText.length > 0;
    }),
});

const EditCourseLessons = () => {
  const { id: lessonId } = useParams(); // Get lesson ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from navigation state
  const [courseID, setCourseID] = useState(location.state?.courseID);
  const [courseName, setCourseName] = useState(location.state?.lessonData?.courseId?.name);
  const [lesson, setLesson] = useState({});
  const [duration, setDuration] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [quizListLength, setQuizListLength] = useState("");
  const [homeworkListLength, setHomeworkListLength] = useState("");
  const [courseDetail, setCourseDetail] = useState({});
  console.log("lesson id....",courseName)
  useEffect(() => {
    if (lessonId) {
      getLessonDetail();
      getQuizDetails();
      getHomeWorkDetails();
    }
  }, [lessonId]);

  // Log out
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Get lesson details
  const getLessonDetail = () => {
    const userId = localStorage.getItem("userId");
    Api.get(`api/v1/courseLesson/${lessonId}`, { headers: { userId: userId } })
      .then((res) => {
            console.log("course Name..",res)
        const data = res.data.data.getOne;
        
        // Handle description - if it's stored as Draft.js content, convert it
        let descriptionContent = "";
        try {
          // Try to parse as Draft.js content first
          const draftContent = JSON.parse(data.description);
          // Convert Draft.js to plain text for Quill
          descriptionContent = draftContent.blocks?.map(block => block.text).join('\n') || data.description;
        } catch (e) {
          // If parsing fails, assume it's already HTML or plain text
          descriptionContent = data.description || "";
        }
        
        setLesson(data);
        setDuration(data.duration);
        setDescription(descriptionContent);
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

  const getQuizDetails = () => {
    const userId = localStorage.getItem("userId");
    Api.get("api/v1/lessonQuiz/list", {
      params: {
        courseLessonId: lessonId,
        userId: userId,
      },
    })
      .then((res) => {
       
        const data = res.data.quizData;
        const quizData = data.length;
        setQuizListLength(quizData);
      })
      .catch((error) => {
      
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const getHomeWorkDetails = () => {
    const userId = localStorage.getItem("userId");
    Api.get("api/v1/lessonHomework/list", {
      params: {
        courseLessonId: lessonId,
        userId: userId,
      },
    })
      .then((res) => {
         
        const data = res.data.homeworkData;
        const homeworkData = data.length;
        setHomeworkListLength(homeworkData);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  // Submit form
  const submitForm = (values) => {
    const quizCount = quizListLength;
    const homeWorkCount = homeworkListLength;
    const actualAmount = parseInt(values.lessonActualAmount);
    const discountAmount = parseInt(values.lessonDiscountAmount);
    const userId = localStorage.getItem("userId");

    if (discountAmount > actualAmount) {
      toast.error("Lesson Discount Amount Should Be Lesser Than Actual Amount");
      return;
    }

    if (quizCount === 0 || homeWorkCount === 0) {
      toast.error("Quiz And HomeWork Need To Be Created For This Lesson");
      return;
    }

    setIsSubmit(true);
    console.log("@@@@bhbj")
    Api.patch(`api/v1/courselesson/${lessonId}`, {
      courseId: courseID,
      lessonNumber: values.lessonNumber,
      lessonName: values.lessonName,
      lessonActualAmount: actualAmount,
      lessonDiscountAmount: discountAmount,
      description: description, // React Quill stores as HTML
      duration: duration,
      userId: userId,
    })
      .then((response) => {
      
        const status = response.status;
        if (status === 200 || status === 201) {
          setIsSubmit(false);
          getLessonDetail();
          toast.success("Lesson Updated Successfully");
        } else {
          toast.error(response.data.message);
          setIsSubmit(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          if (error.response.data.status === "error") {
            toast.error("Details doesn't exist");
            navigate("/course/list");
          } else {
            toast.error(error.response.data.message);
          }
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
        setIsSubmit(false);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // if (!courseID) {
  //   return (
  //     <Container>
  //       <CourseSideMenu courseID={courseID} />
  //       <div className="alert alert-danger mt-3">
  //         <h5>Error: Course information fnot found</h5>
  //         <Button onClick={handleGoBack} variant="contained" color="primary">
  //           Go Back
  //         </Button>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="mt-1">
      <CourseSideMenu courseID={courseID} lessonId={lessonId} />
      <div className="edit-course-lesson-style mx-1">
        {isLoading ? (
          <Loader />
        ) : (
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className="mt-2 mb-4">
                <h4>{courseName|| "Edit Lesson"}</h4>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  lessonNumber: lesson.lessonNumber || "",
                  lessonName: lesson.lessonName || "",
                  lessonActualAmount: lesson.lessonActualAmount || "",
                  lessonDiscountAmount: lesson.lessonDiscountAmount || "",
                  description: description,
                }}
                validationSchema={createLessonSchema}
                onSubmit={(values) => submitForm(values)}
              >
                {(formik) => {
                  const {
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isValid,
                  } = formik;
                  return (
                    <div>
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Lesson Number</Label>
                              <FormControl
                                type="number"
                                name="lessonNumber"
                                id="lessonNumber"
                                placeholder="Lesson No."
                                value={values.lessonNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-styles"
                              />
                              <ErrorMessage
                                name="lessonNumber"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Lesson Name</Label>
                              <FormControl
                                type="text"
                                name="lessonName"
                                id="lessonName"
                                placeholder="Enter Lesson Name"
                                value={values.lessonName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-styles"
                              />
                              <ErrorMessage
                                name="lessonName"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Actual Amount</Label>
                              <InputGroup className="input-group">
                                <InputGroup.Text>
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    size="1x"
                                  />
                                </InputGroup.Text>
                                <FormControl
                                  type="number"
                                  name="lessonActualAmount"
                                  id="lessonActualAmount"
                                  placeholder="Actual Amount"
                                  value={values.lessonActualAmount}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-styles"
                                />
                              </InputGroup>
                              <ErrorMessage
                                name="lessonActualAmount"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Discount Amount</Label>
                              <InputGroup className="input-group">
                                <InputGroup.Text>
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    size="1x"
                                  />
                                </InputGroup.Text>
                                <FormControl
                                  type="number"
                                  name="lessonDiscountAmount"
                                  id="lessonDiscountAmount"
                                  placeholder="Discount Amount"
                                  value={values.lessonDiscountAmount}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-styles"
                                />
                              </InputGroup>
                              <ErrorMessage
                                name="lessonDiscountAmount"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="mb-3">
                          <Label notify={true}>Description</Label>
                          <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={quillModules}
                            formats={quillFormats}
                            style={{ height: "200px", marginBottom: "50px" }}
                          />
                          <ErrorMessage
                            name="description"
                            component="span"
                            className="error text-danger"
                          />
                        </div>
                        <div className="d-flex justify-content-end my-4">
                          <Button
                            variant="outlined"
                            className="px-3 me-3"
                            onClick={handleGoBack}
                          >
                            CANCEL
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={!isValid || isSubmit}
                            className="save-changes-active"
                          >
                            {isSubmit ? "UPDATING..." : "UPDATE"}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default EditCourseLessons;