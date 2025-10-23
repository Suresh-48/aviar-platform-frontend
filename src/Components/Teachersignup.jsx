import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import{useNavigate} from 'react-router-dom'
import {
  InputGroup,
  Form,
  Button,
  FormControl,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import { convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Styles
// import "../../css/ParentSignup.scss";
// Api
// import Api from "../../Api";
// Component
// import Label from "../../components/core/Label";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faEyeSlash,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";
import "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
// import { customStyles } from "../core/Selector";

const TeacherSignup = () => {
  //   const history = useHistory();
  const navigate = useNavigate ();

  const [details, setDetails] = useState([]);
  const [parentId, setParentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [type, setType] = useState("text");
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  //   const [specialityDescription, setSpecialityDescription] = useState(EditorState.createEmpty());
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [skills, setSkills] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [description, setDescription] = useState("");
  // Validations

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Validations
  const SignInSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
      .matches(/^[A-Z]/, "First Letter Must Be In Capital")
      .required("First Name Is Required"),

    middleName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
      .matches(/^[A-Z]/, "First Letter Must Be In Capital")
      .nullable(),

    lastName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
      .matches(/^[A-Z]/, "First Letter Must Be In Capital")
      .required("Last Name Is Required"),

    phone: Yup.string()
      .matches(/^[0-9\s]+$/, "Enter Valid Phone Number")
      .max(10, "Enter valid number")
      .min(10, "Enter valid number")
      .length(10)
      .required("Phone Number Is Required"),
    email: Yup.string()
      .email("Enter Valid Email")
      .required("Email Is Required"),
    speciality: Yup.string().required("Speciality Is Required"),
    // descriptionValue: Yup.string().required(
    //   "Speciality Description Is Required"
    // ),
    // hearAboutUs:Yup.string().required("Required Field"),
    userName: Yup.string().required("User Name Is Required"),
    password: Yup.string()
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*$%^&*])",
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "Password Required Minimum 8 Characters")
      .required("Password Is Required"),

    confirmPassword: Yup.string()
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*$%^&*])",
        "Confirm Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .oneOf([Yup.ref("password"), null], "Password Did Not Match")
      .required("Confirm Password Is Required"),
   
  });

  // const onChangeDescription = ({ setFieldValue }, e) => {
  //   const editedText = convertToRaw(e.getCurrentContent());
  //   setFieldValue("descriptionValue", editedText.blocks[0].text);
  // };

  const submitForm = (values, { resetForm }) => {
    setIsSubmitting(true);
    
    // console.log("values....", values);
    // console.log("resetForm", resetForm);

    axios
      .post("http://localhost:3000/api/v1/teacher/signup", {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        hearAboutUs: hearAboutUs,
        speciality: values.speciality,
        userName: userName,
        // specialityDescription: convertedData,
        // skills: skillsData,
      })
   
      .then((response) => {
                // console.log("response",response);
                // setIsSubmit(false);
                // const status = response.status;
                if (response.status === 201) {
                  toast.success("Teacher created successfully");
                  console.log("User created successfully!");
                  navigate("/teacher/menu");
                  resetForm();
                // localStorage.setItem("teacherId",teacherId);
                // localStorage.setItem("token",token);
                // localStorage.setItem("role",role);
            
                
      
                } 
                  // toast.error(response.data.message); // Show error message
                }
              )
          .catch((error) => {
                // Handle errors properly, checking the response
                if (error.response && error.response.status === 400) {
``                    // console.log("error.....", error.response.data.message);
                 toast.error(error.response.data.message);
                } else {
                  // Generic error handling
                  toast.error("Something went wrong!");
                }
                setIsSubmitting(false);
              });
          } 
          const getUsername = (e) => {
            let username = e.target.value;
            let laststr = username.substr(username.length - 1);
        
            const format = /^[!@#$%^&*()_+\- =[\]{};':"\\|,.<>/?]*$/;
            if (laststr.match(format)) {
              let name = username.replace(laststr, " ");
              setUserName(name);
            } else {
              setUserName(username);
            }
        
            axios.get( "http://localhost:3000/api/v1/teacher/check/username", {
              params: {
                userName: username,
              },
            }).then((response) => {
              let status = response?.data?.data?.userName;
              if (username.toLowerCase() === status?.toLowerCase()) {
                let errMsg = "Username Is Already Exist";
                setErrorMessage(errMsg);
              } else {
                setErrorMessage("");
              }
            });

          }; 
  //     .catch((error) => {
  //       const errorValue = error.response.status;
  //       if (errorValue === 400) {
  //         toast.error("Teacher Already Exists");
  //       }
  //     }
  //   );
  // };

  // const getUsername = (e) => {
  //   let username = e.target.value;
  //   let laststr = username.substr(username.length - 1);

  //   let format = /^[!@#$%^&*()_+\- =[\]{};':"\\|,.<>/?]*$/;
  //   if (laststr.match(format)) {
  //     let name = username.replace(laststr, " ");
  //     setUserName(name);
  //   } else {
  //     setUserName(username);
  //   }

  //   axios.get("http://localhost:3000/api/v1/teacher/check/username", {
  //     params: {
  //       userName: username,
  //     },
  //   }).then((response) => {
  //     let status = response?.data?.data?.userName;
  //     if (username.toLowerCase() === status?.toLowerCase()) {
  //       let errMsg = "Username Is Already Exist";
  //       setErrorMessage(errMsg);
  //     } else {
  //       setErrorMessage("");
  //     }
  //   });
  // };

  //   const getCategoryList = () => {
  //     axios.get("http://localhost:3000//api/v1/category").then((res) => {
  //       const option = res.data.data.data;
  //       setCategoryList(option);
  //     });
  //   };
  //   onSubmit =() =>{
  //     console.log("From data".values)
  // }
  // useEffect(() => {
  //   // getCategoryList();
  //   getRandomCaptcha();
  // }, []);

  return (
    <Container className=" my-2 px-3" fluid>
      <Card className="p-md-3 p-lg-4 teacer-sign-background">
        <div className="row  mt-2">
          <div className="col-sm-12" style={{ height: "auto" }}>
            <h4
              className="d-flex justify-content-center mb-4"
              style={{ fontFamily: "none", fontWeight: "bold" }}
            >
              Teacher Sign Up
            </h4>

            <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                size="3x"
                color="#1d1464"
              />
            </div>
            <div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  middleName: "",
                  phone: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  hearAboutUs: "",
                  speciality: "",
                  descriptionValue: "",
                  userName: "",
                  skills: "",
                  // captcha: "",
                }}
                validationSchema={SignInSchema}
                // onSubmit={(values, { resetForm }) => {
                //   // console.log("hello"), submitForm(values, { resetForm });
                // }}
                onSubmit={submitForm}
              >
                {(formik) => {
                  const {
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isValid,
                    setFieldValue,
                  } = formik;
                  return (
                    <div>
                      <Form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center">
                          <Col xs={12} sm={4}>
                            <Form.Group className="form-row mb-3">
                              {/* <Label notify={true}>First Name</Label> */}
                              <span> First Name </span>
                              <br />
                              <FormControl
                                type="type"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter Your First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={4}>
                            <Form.Group className="form-row mb-3">
                              {/* <Label>Middle Name</Label> */}
                              <span> Middle Name</span>
                              <br />
                              <FormControl
                                type="type"
                                name="middleName"
                                id="middleName"
                                placeholder="Enter Your Middle Name"
                                value={formik.values.middleName}
                                onChange={formik.handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="middleName"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={4}>
                            <Form.Group
                              className="form-row"
                              style={{ width: "100%" }}
                            >
                              {/* <Label notify={true}>Last Name</Label> */}
                              <span> Last Name</span>
                              <br />
                              <FormControl
                                type="type"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter Your Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-center">
                        <Col>
                            
                           
                      <Form.Group className="form-row mb-3">
                        <span>User Name</span>
                        <FormControl
                          type="text"
                          name="userName"
                          placeholder="Enter User Name"
                          value={formik.values.userName}
                          onChange={(e) => {
                            formik.handleChange(e);
                            getUsername(e);
                          }}
                          onBlur={formik.handleBlur}
                        />

                              <ErrorMessage name="userName" component="span" className="error text-danger" />

                              <p className="error text-danger"> {errorMessage} </p>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="form-row mb-3">
                              {/* <Label notify={true}> Email</Label> */}
                              <span>Email</span>
                              <br />
                              <FormControl
                                type="email"
                                name="email"
                                id="email"
                                style={{ textTransform: "lowercase" }}
                                placeholder="Enter Your Email "
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="email"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <Col>
                            <Form.Group className="form-row mb-3">
                              {/* <Label notify={true}>Phone Number</Label> */}
                              <span>Phone Number</span>
                              <br />
                              <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                  +1
                                </InputGroup.Text>
                                <FormControl
                                  name="phone"
                                  id="phone"
                                  maxLength="10"
                                  type="tel"
                                  placeholder="Enter Your Phone Number"
                                  value={formik.values.phone}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="form-width"
                                />
                              </InputGroup>
                              <ErrorMessage
                                name="phone"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              {/* <Label>How Did You Hear About Us?</Label> */}
                              How Did You Hear Aboud Us                              
                              <br />
                              <Select
                                value={formik.values.hearAboutUs}
                                // styles={customStyles}
                                placeholder="How Did You Hear About Us?"
                                name="hearAboutUs"
                                // onChange={(e) => {
                                //   setFieldValue("hearAboutUs", e);
                                //   setHearAboutUs(e.value);
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    setFieldValue("hearAboutUs", e);
                                  setHearAbout(formik.e.value);
                                  }}
                                  onBlur={formik.handleBlur}
                                // }}
                                options={[
                                  {
                                    value: "Referred By A Friend",
                                    label: "Referred By A Friend",
                                  },
                                  {
                                    value: "Web Search",
                                    label: "Web Search",
                                  },
                                  {
                                    value: "Social Media",
                                    label: "Social Media",
                                  },
                                ]}
                              />
                              <ErrorMessage
                                name="hearAboutUs"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div></div>
                        <div className="row d-flex justify-content-center">
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              {/* <Label notify={true}>Password</Label> */}
                              password
                              <InputGroup className="input-group ">
                                <FormControl
                                  type={passwordShown ? "text" : "password"}
                                  name="password"
                                  id="password"
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="form-width"
                                  placeholder="Password"
                                  onCopy={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  onPaste={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                />

                                <InputGroup.Text>
                                  <FontAwesomeIcon
                                    icon={passwordShown ? faEye : faEyeSlash}
                                    style={{ cursor: "pointer" }}
                                    onClick={togglePasswordVisibility}
                                    size="1x"
                                  />
                                </InputGroup.Text>
                              </InputGroup>
                              <ErrorMessage
                                name="password"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              {/* <Label notify={true}>Confirm Password</Label> */}
                              ConfirmPassword
                              <InputGroup>
                                <FormControl
                                  type={
                                    confirmPasswordShown ? "text" : "password"
                                  }
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  value={formik.values.confirmPassword}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="form-width"
                                  placeholder="Confirm Password"
                                  onCopy={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  onPaste={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                />
                                <InputGroup.Text>
                                  <FontAwesomeIcon
                                    icon={
                                      confirmPasswordShown ? faEye : faEyeSlash
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={toggleConfirmPasswordVisibility}
                                    size="1x"
                                  />
                                </InputGroup.Text>
                              </InputGroup>
                              <ErrorMessage
                                name="confirmPassword"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-left">
                          <Col>
                            <Form.Group className="form-row mb-3">
                              speciality
                              {/* <Label notify={true}>Speciality</Label> */}
                              <br />
                              <FormControl
                                type="speciality"
                                name="speciality"
                                id="speciality"
                                placeholder="Enter Your Speciality"
                                value={formik.values.speciality}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="speciality"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="form-row mb-3">
                              Skill
                              {/* <Label>Skills</Label> */}
                              <br />
                              <Select
                                value={values.skills}
                                // styles={customStyles}
                                placeholder="Add Your Skills"
                                name="skills"
                                onChange={(e) => {
                                  setFieldValue("skills", e);
                                }}
                                options={[
                                  {
                                    options: categoryList.map((list) => ({
                                      value: list.id,
                                      label: list.name,
                                    })),
                                  },
                                ]}
                                isMulti
                              />
                              <ErrorMessage
                                name="skills"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        {/* <div className="d-flex justify-content-center mb-4">
                          <Form.Group
                            className="form-row"
                            style={{ width: "100%" }}
                          >
                            Speciality Description
                            {/* <Label notify={true}>Speciality Description</Label> */}
                            {/* <br />
                            <ReactQuill
                              spellCheck
                              name="descriptionValue"
                              editorState={description}
                              onEditorStateChange={(e) => {
                                setSpecialityDescription(e);
                                onChangeDescription({ setFieldValue }, e);
                              }}
                              toolbar={{
                                options: ["inline", "list", "textAlign"],
                              }}
                            />
                            <ErrorMessage
                              name="descriptionValue"
                              component="span"
                              className="error text-danger"
                            />
                          </Form.Group> */}
                        {/* </div>  */}
                        <div className="mb-5">
                          <Form.Group>
                            {" "}
                            {/* <Label notify={true}>Captcha</Label> */}
                          </Form.Group>
                          {/* <Row> */}
                          {/* /
                            <Col className="d-flex flex-direction-row align-items-center">
                              <s
                                className="border border-primary captcha-form-alignment  px-4 mx-4 "
                                style={{
                                  backgroundColor: "azure",
                                  color: "black",
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                              >
                                {captcha}
                              </s>
                              <FontAwesomeIcon
                                icon={faRedoAlt}
                                size="1x"
                                color="blue"
                                className="captcha-icon"
                                onClick={getRandomCaptcha}
                              />
                            </Col> */}
                          {/* </Row> */}
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-3 ">
                          <Button
                            // onClick={()=> navigate('/Studentsidebar')}

                            className={`${
                              !isValid || isSubmitting
                                ? "create-account-disable"
                                : "create-account-active"
                            }`}
                            variant="contained"
                            type="submit"
                            color="btn-primary"
                            // disabled={!isValid || isSubmit}
                          >
                            {" "}
                          {isSubmitting ?"Submitting...": "Sign Up as Teacher"}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default TeacherSignup;
