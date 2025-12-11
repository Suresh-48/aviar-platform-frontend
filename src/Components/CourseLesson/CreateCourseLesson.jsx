import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, Form, InputGroup } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
// Styles
import "../../CSS/CreateCourseLesson.css";
// Api
import Api from "../../Api";
// Component
import { toast } from "react-toastify";
import Label from "../../Components/core/Label";
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

const CreateCourseLessons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSubmit, setIsSubmit] = useState(false);
  const [courseName, setCourseName] = useState(location.state?.courseName);
  const [courseId, setCourseId] = useState(location.state?.courseID);
  const [description, setDescription] = useState("");
  


  // Validations
  const createLessonSchema = Yup.object().shape({
    lessonNumber: Yup.string()
      .matches(/^[0-9]*$/, "This Field Accept Numbers Only")
      .required("Lesson Number Is Required"),
    lessonName: Yup.string().required("Lesson Name Is Required"),
    lessonActualAmount: Yup.string().required("Lesson Amount Is Required"),
    lessonDiscountAmount: Yup.string().required("Lesson Discount Amount Is Required"),
    description: Yup.string()
      .required("Description Is Required")
      .test('is-not-empty', 'Description Is Required', (value) => {
        if (!value) return false;
        const plainText = value.replace(/<[^>]*>/g, '').trim();
        return plainText.length > 0;
      }),
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  // Log out function
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Submit form
  const submitForm = (values) => {
    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    const userId = localStorage.getItem("userId");
    setIsSubmit(true);

    console.log("Submitting with courseId:", courseId);
    console.log("Form values:", values);

    Api.post("api/v1/courseLesson/", { 
      courseId: courseId,
      lessonNumber: parseInt(values.lessonNumber),
      lessonName: values.lessonName,
      lessonDiscountAmount: parseFloat(values.lessonDiscountAmount),
      lessonActualAmount: parseFloat(values.lessonActualAmount),
      description: description,
      userId: userId, 
    })
    .then((res) => {
      console.log("Response:", res);
      if (res.status === 201 || res.status === 200) {
        toast.success("Lesson created successfully!");
        navigate(-1); // Go back to previous page
      } else if (res.status === 208) {
        toast.warning(res.data.message || "Lesson already exists");
      }
      setIsSubmit(false);
    })
    .catch((error) => {
      console.error("Error creating lesson:", error);
      if (error.response?.status === 401) {
        logout();
        toast.error("Session Timeout");
      } else {
        toast.error(error.response?.data?.message || "Failed to create lesson");
      }
      setIsSubmit(false);
    });
  };

  // Show error if courseId is not available
  if (!courseId) {
    return (
      <Container>
        <div className="alert alert-danger mt-3">
          <h5>Error: Course information not found</h5>
          <p>Please go back and select a course first.</p>
          <Button onClick={handleGoBack} variant="contained" color="primary">
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="mt-2 mb-4">
            <h4>{courseName || "Create New Lesson"}</h4>
          </div>
          
          <Formik
            initialValues={{
              lessonNumber: "",
              lessonName: "",
              lessonActualAmount: "",
              lessonDiscountAmount: "",
              description: description,
            }}
            // validationSchema={createLessonSchema}
            onSubmit={(values) => submitForm(values)}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur, isValid } = formik;
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
                            placeholder="Lesson Number"
                            value={values.lessonNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-styles"
                          />
                          <ErrorMessage name="lessonNumber" component="span" className="error text-danger" />
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
                          <ErrorMessage name="lessonName" component="span" className="error text-danger" />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col xs={12} sm={6}>
                        <Form.Group className="form-row mb-3">
                          <Label notify={true}>Actual Amount</Label>
                          <InputGroup className="input-group">
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faDollarSign} size="1x" />
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
                          <ErrorMessage name="lessonActualAmount" component="span" className="error text-danger" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group className="form-row mb-3">
                          <Label notify={true}>Discount Amount</Label>
                          <InputGroup className="input-group">
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faDollarSign} size="1x" />
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
                          <ErrorMessage name="lessonDiscountAmount" component="span" className="error text-danger" />
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
                      <ErrorMessage name="description" component="span" className="error text-danger" />
                    </div>
                    
                    <div className="d-flex mt-3">
                      <Button
                        variant="outlined"
                        className="px-3 me-3"
                        onClick={handleGoBack}
                        disabled={isSubmit}
                      >
                        CANCEL
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid || isSubmit}
                        className="create-active"
                      >
                        {isSubmit ? "CREATING..." : "CREATE"}
                      </Button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourseLessons;