import React, { useState, useEffect, useId } from "react";
import { Container, Row, Col, FormControl, Form, InputGroup } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import { useNavigate } from 'react-router-dom';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from "draft-js";
import "react-quill"
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import ReactQuill from "react-quill";
import * as Yup from "yup";
// Styles
import "../../CSS/CreateCourseLesson.css";
import axios from "axios";
// Api
import Api from "../../Api";

// Component
import { toast } from "react-toastify";
import Label from "../../Components/Core/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const EditCourseLessons = (props) => {
  const [duration, setDuration] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [courseName, setCourseName] = useState(props?.location?.state?.courseName);
  const [courseId, setCourseId] = useState(props?.location?.state?.courseId);
//   const [description, setDescription] = useState(EditorState.createEmpty());
  // const [zoomLink, setZoomLink] = useState("");
  // const [zoomPassword, setZoomPassword] = useState("");
  const [courseActualAmount, setCourseActualAmount] = useState("");
  const [courseDiscountAmount, setCourseDiscountAmount] = useState("");
  const [overAllLessonTotal, setOverAllLessonTotal] = useState("");

  useEffect(() => {
    // getCourseData();
    // createCourseData();
  }, []);

  // Validations
const createLessonSchema = Yup.object().shape({
  lessonNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{0,4}?[ \\-]*[0-9]{0,4}?$/,
      "This Field Accept Numbers Only"
    )
    .required("Lesson Number Is Required"),
  lessonName: Yup.string().required("Lesson Name Is Required"),
  // descriptionValue: Yup.string().required("Description Is Required"),
  lessonActualAmount: Yup.string().required("Lesson Amount Is Required"),
  lessonDiscountAmount: Yup.string().required("Lesson Discount Amount Is Required"),
});

  // Description on change
  const onChangeDescription = ({ setFieldValue }, e) => {
    const editedText = convertToRaw(e.getCurrentContent());
    setFieldValue("descriptionValue", editedText.blocks[0].text);
  };

const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
};








  // Submit form
  const submitForm = (values) => {
      const userId = localStorage.getItem("userId");
    Api.post("api/v1/courseLesson/",{ 
      courseId: courseId,
      lessonNumber: values.lessonNumber,
      lessonName: values.lessonName,
      lessonDiscountAmount:values.lessonDiscountAmount,
      lessonActualAmount:values.lessonActualAmount,
      userId:userId, 
      })
.then((res)=>{console.log("res",res);
  if(res.status===208){
    console.log("res",res);
  toast.success(res)
  }
})
    }
   
  





  // Validations

  return (
    <div>
      <Container>
      <h5 className="text-center "> Edit Lesson Detail</h5>
      <br/>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className=" mt-2 mb-4">
              <h4>{courseName}</h4>
            </div>
           
            <Formik
              initialValues={{
                lessonNumber: "",
                lessonName: "",
                lessonActualAmount: "",
                lessonDiscountAmount: "",
                // description: "",
                // descriptionValue: "",
              }}
              validationSchema={createLessonSchema}
              onSubmit={(values) => submitForm(values)}
            >
              {(formik) => {
                const { values, setFieldValue, handleChange, handleSubmit, handleBlur, isValid } = formik;
                return (
                  <div>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} sm={6}>
                          <Form.Group className="form-row mb-3">
                            <Label notify={true}>Lesson Number</Label>
                            <FormControl
                              type="type"
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
                              type="type"
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
                            <Label notify={true}> Actual Amount</Label>
                            <InputGroup className="input-group ">
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faDollarSign} size="1x" />
                              </InputGroup.Text>
                              <FormControl
                                type="type"
                                name="lessonActualAmount"
                                id="lessonActualAmount"
                                placeholder=" Actual Amount"
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
                            <Label notify={true}> Discount Amount</Label>
                            <InputGroup className="input-group ">
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faDollarSign} size="1x" />
                              </InputGroup.Text>
                              <FormControl
                                type="type"
                                name="lessonDiscountAmount"
                                id="lessonDiscountAmount"
                                placeholder=" Discount Amount"
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
                      
                      {/* <div> */}
                        {/* <Label notify={true}>Description</Label> */}
                        {/* <div className="description">
                          <ReactQuill
                            spellCheck
                            name="descriptionValue"
                            // editorState={description}
                            // onEditorStateChange={(e) => {
                            //   setDescription(e);
                            //   onChangeDescription({ setFieldValue }, e);
                            // }}
                            toolbar={{
                              options: ["inline", "list", "textAlign"],
                            }}
                          />
                        </div> */}
                        {/* <ErrorMessage name="descriptionValue" component="span" className="error text-danger" /> */}
                      {/* </div>
                   */}
                        <div className="d-flex mt-3">
                          <Button
                            className="px-3 aviar-cancel-btn danger mt-3"
                            onClick={() => {
                              handleGoBack();
                            }}
                          >
                            CANCEL
                          </Button>
                          <Button
                            type="submit"
                            className="create-active mt-3"
                            // disabled={!isValid || isSubmit}
                            variant="contained"
                            // className={`${!isValid || isSubmit ? "create-disable ms-3" : "create-active ms-3"}`}
                          >
                            CREATE
                          </Button>
                        {/* </div> */}
                      </div>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditCourseLessons;
