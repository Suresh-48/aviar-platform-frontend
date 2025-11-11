import React, { useState, useEffect, useRef } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Dropdown,
  InputGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
// import Button from "@material-ui/core/Button";

import moment from "moment";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/";
// import { DatePicker } from '@material-ui/pickers';

// Api
import Api from "../../Api";

// Style
import "../CSS/Student.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEye,
  faEyeSlash,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

// Component
// import Label from "../../components/core/Label";
// import Loader from "../../components/core/Loader";
import states from "../Core/States";
import profile from "../Images/NoProfile.png";
import axios from "axios";
// import { customStyles } from "../core/Selector";

// Validations
const EmailSignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("First Name Is Required"),
  // Rest of the schema

  // ... Rest of the schema
});

const GoogleAndFacebookSignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("First Name Is Required"),
  // Rest of the schema

  // ... Rest of the schema
});

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const EditStudentDetails = (props) => {
  // console.log("std id....", localStorage.getItem("userId"));

  const [details, setDetails] = useState([]);
  const [studentId, setStudentId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [city, setCity] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [state, setState] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [stateCode, setStateCode] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [dob, setDob] = useState("");
  const [fileUploadState, setFileUploadState] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [aliasName, setAliasName] = useState(props?.location?.state?.aliasName);
  const inputReference = useRef(null);

  //logout

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const tooglePasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const fileUploadAction = () => inputReference.current.click();

  const fileUploadInputChange = async (e) => {
    const file = e.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    const userId = localStorage.getItem("userId");
    setImagePreview(base64);
    if (type === "image") {
      Api.post(`api/v1/student/profile/upload`, {
          studentId: studentId,
          image: imagePreview,
          userId: userId,
        })
        .then((response) => {
          const status = response.status;
          if (status === 201) {
            toast.success("Profile Upload Successfully!...");
            // studentDetails();
            window.location.reload();
          }
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
        });
      }
  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    toast.error("Only image files are accepted");
    return;
  }

  const reader = new FileReader();
  
  reader.onloadend = async () => {
    const base64 = reader.result;
    setImagePreview(base64);

    try {
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");

      const response = await Api.post(`api/v1/student/profile/upload`, {
        studentId: studentId,
        image: base64,
        userId: userId,
      });

      if (response.status === 201) {
        toast.success("Profile Uploaded Successfully!");
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  reader.readAsDataURL(file);
  e.target.value = ''; // Reset input
};

  // Delete Image
  const removeImage = () => {
    const userId = localStorage.getItem("userId");
    Api.delete("api/v1/student/remove/profile", {
        params:{
          studentId: studentId,
          userId: userId,
        },
      })
      .then((response) => {
        studentDetails();
        window.location.reload();
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
    setImagePreview("");
  };

  // Convert Image to Base64
  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // Parent details get
  const studentDetails = () => {
    const userId = localStorage.getItem("userId");
    const studentId = localStorage.getItem("studentId");
   Api.get(`api/v1/student/${studentId}`, {
        headers: { userId: userId },
      })
      .then((res) => {
        const data = res.data.data.getOne;

        // setDetails(data);
        // setIsLoading(false);
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setPhone(data.phone);
        setEmail(data.email);
        setDob(data.dob);
        setPassword(data.password);
        setConfirmPassword(data.confirmPassword);
        setImagePreview(data.imageUrl);
        setGenderValue(data.gender);
        setGender(
          data?.gender ? { value: data?.gender, label: data?.gender } : ""
        );
        setZipCode(data.zipCode);
        setCityValue(data.city);
        setState(data.state ? { value: data?.state, label: data?.state } : "");
        setStateValue(data.state);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;

        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          // console.error("API Error:", error.response || error.message);
        }
      });
    // console.log("res",res)
  };

  useEffect(() => {
    studentDetails();
  }, []);

  // Submit Details

  const submitForm = (values) => {
    console.log("values...",values)
    setIsSubmit(false);

    const email = values.email.toLowerCase();
    const startDate = dob;
    const gender = values.gender.value ? values.gender.value : "";
    const City = values.city.value ? values.city.value : "";
    const state = values.state.value ? values.state.value : "";
    const dateValue = moment(startDate).format("ll");
    const userId = localStorage.getItem("userId");
    const studentId = localStorage.getItem("studentId");
    Api.patch(`http://localhost:3000/api/v1/student/${studentId}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        dob: dateValue,
        gender: gender,
        phone: values.phoneNumber,
        email: email,
        address1: values.address1,
        address2: values.address2,
        city: City,
        state: state,
        zipCode: values.zipCode,
        password: values.password,
        confirmPassword: values.confirmPassword,
        loginType: details.loginType,
        userId: userId,
      })
      // .then((res)=>{console.log("res",res.data.editDetail)})
      .then((res) => {
        const status = res.status;

        // console.log("res",res.data.editDetail);

        if (status === 201) {
          setIsSubmit(true);
          toast.success("Updated");
        }
      })
      .catch((error) => {
        const errorStatus = error?.res?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("something went wrong");
          // toast.error("Session Timeout");
        }
      });
      
  };

  // Date Format
  const setDateFormat = (e) => {
    let dateValue = moment(e).format("LLLL");
    let dob = new Date(dateValue);
    let month = Date.now() - dob.getTime();
    let getAge = new Date(month);
    let year = getAge.getUTCFullYear();
    let age = Math.abs(year - 1970);

    if (age >= 5 && age <= 18) {
      setDob(dateValue);
    } else {
      toast.warning("Your Age Must Be at least 5 years to at most 18 years");
      setDob(null);
    }
  };

  const Index = (value) => {
    let selectState = value;
    for (let i = 0; i < states.length; i++) {
      if (states[i].state === selectState.value) {
        setStateCode(i);
      }
    }
  };

  const validate = () => {
    let errors = {};
    if (!stateValue) {
      errors.state = "State Is Required";
    }
    if (!cityValue) {
      errors.city = "City Is Required";
    }
    return errors;
  };

  return (
    <Container>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}

      <Container className="p-3">
        <Row className=" py-0 profile-dropdown-status">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: firstName,
              lastName: lastName,
              middleName: middleName,
              dob: dob,
              gender: gender,
              phoneNumber: phone,
              email: email,
              address1: address1,
              address2: address2,
              state: state,
              city: city,
              zipCode: zipCode,
              password: password,
              confirmPassword: confirmPassword,
            }}
            validationSchema={
              details.logininType === "Email"
                ? EmailSignInSchema
                : GoogleAndFacebookSignInSchema
            }
            onSubmit={(values) => submitForm(values)}
          >
            {(formik) => {
              const { values, handleChange, setFieldValue,handleSubmit, handleBlur } =
                formik;
              return (
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col
                        sm={12}
                        xs={12}
                        md={12}
                        lg={4}
                        className="d-flex justify-content-center px-4 pt-2"
                        style={{ backgroundColor: "#0000000a" }}
                      >
                        <Dropdown className="dropdown-profile-list">
                          <Dropdown.Toggle
                            className="teacher-menu-dropdown p-0"
                            varient="link"
                          >
                            <div>
                              <div>
                                {imagePreview ? (
                                  <img
                                    src={imagePreview}
                                    width="220"
                                    height="220"
                                    style={{ borderRadius: "50%" }}
                                  />
                                ) : (
                                  <Avatar
                                    src={profile}
                                    size="220"
                                    round={true}
                                    color="silver"
                                    className="image-size"
                                  />
                                )}
                              </div>
                              <div className="d-flex justify-content-center mt-3">
                                <p style={{ fontSize: 11, color: "black" }}>
                                  Click Here To Upload Profile
                                </p>
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="sm"
                                  color="#1d1464"
                                  className="mx-1"
                                />
                              </div>
                            </div>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            center
                            className="profile-dropdown-status  ms-4 py-0"
                          >
                            <Dropdown.Item className="status-list">
                              <Link
                                to="#"
                                className="change-profile-text-style"
                                onClick={fileUploadAction}
                              >
                                Change Profile
                              </Link>
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item className="status-list">
                              <Link
                                to="#"
                                className="change-profile-text-style"
                                onClick={removeImage}
                              >
                                Remove Profile
                              </Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <input
                          type="file"
                          name="courseImage"
                          accept="image/*"
                          className="fileToUpload"
                          ref={inputReference}
                          id="fileToUpload"
                          style={{ display: "none" }}
                          onChange={fileUploadInputChange}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={8} className="py-4 px-4">
                        <div className="row d-flex justify-content-center">
                          <Col xs={12} sm={4} md={4}>
                            <Form.Group className="form-row mb-3">
                              First Name
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="type"
                                name="firstName"
                                placeholder="First Name"
                                id="firstName"
                                // data={details}
                                value={values.firstName}
                                onChange={handleChange}
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
                              Middle Name
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="type"
                                name="middleName"
                                placeholder="Middle Name"
                                id="middleName"
                                value={values.middleName}
                                // data={details}
                                onChange={handleChange}
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
                            <Form.Group className="form-row mb-3">
                              Last Name
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="type"
                                placeholder="Last Name"
                                name="lastName"
                                id="lastName"
                                value={values.lastName}
                                // data={details}
                                onChange={handleChange}
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
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Email
                              <span className="text-danger">*</span>
                              <FormControl
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                // disabled={details.loginType !== "Email"}
                                style={{ textTransform: "lowercase" }}
                                value={values.email}
                                onChange={handleChange}
                                // data={details}
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
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Phone Number
                              <span className="text-danger">*</span>
                              <br />
                              <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                  +1
                                </InputGroup.Text>
                                <FormControl
                                  type="tel"
                                  placeholder="PhoneNumber"
                                  maxLength="10"
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  value={values.phoneNumber}
                                  // data={details}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-width"
                                />
                              </InputGroup>
                              <ErrorMessage
                                name="phoneNumber"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Date Of Birth
                              <span className="text-danger">*</span>
                              <br />
                              <Field
                                variant="standard"
                                className="start-time-style"
                                style={{ paddingLeft: 10 }}
                                placeholder="Select Start Date"
                                helperText={""}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                format="MMM dd yyyy"
                                value={values.dob}
                                onChange={(e) => {
                                  setFieldValue("dob", e);
                                  setDateFormat(e);
                                }}
                                // keyboardIcon={
                                //   <FontAwesomeIcon
                                //     icon={faCalendarDay}
                                //     size="sm"
                                //     color="grey"
                                //     style={{ padding: 0 }}
                                //   />
                                // }
                              />
                              <ErrorMessage
                                name="dob"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Gender
                              <span className="text-danger">*</span>
                              <br />
                              <Select
                                id="gender"
                                // styles={customStyles}
                                name="gender"
                                value={values.gender}
                                // data={details}
                                placeholder="Select Gender"
                                onChange={(e) => {
                                  setFieldValue("gender", e);
                                }}
                                options={options}
                              />
                              <ErrorMessage
                                name="gender"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Address Line 1
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="type"
                                name="address1"
                                placeholder="Address 1"
                                id="address1"
                                value={values.address1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="address1"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Address Line 2
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="text"
                                name="address2"
                                placeholder="Address2"
                                id="address2"
                                value={values.address2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="address2"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className=" row d-flex justify-content-center">
                          <Col sm={4} xs={12}>
                            <Form.Group className="form-row mb-3">
                              State
                              <span className="text-danger">*</span>
                              <br />
                              <Select
                                value={values.state}
                                // styles={customStyles}
                                name="state"
                                placeholder="State"
                                onChange={(e) => {
                                  Index(e);
                                  setFieldValue("state", e);
                                }}
                                options={[
                                  {
                                    options: states.map((item) => ({
                                      label: item.state,
                                      value: item.state,
                                    })),
                                  },
                                ]}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={4} xs={12}>
                            <Form.Group className="form-row mb-3">
                              City
                              <span className="text-danger">*</span>
                              <Select
                                placeholder="City"
                                // styles={customStyles}
                                value={values.city}
                                onChange={(e) => {
                                  setFieldValue("city", e);
                                }}
                                options={[
                                  {
                                    options: states[stateCode]?.cities?.map(
                                      (item, key) => ({
                                        label: item,
                                        value: item,
                                      })
                                    ),
                                  },
                                ]}
                                
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={4} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Zip Code
                              <span className="text-danger">*</span>
                              <br />
                              <FormControl
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                id="zipCode"
                                value={values.zipCode}
                                maxLength="5"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-width"
                              />
                              <ErrorMessage
                                name="zipCode"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Password
                              <span className="text-danger">*</span>
                              <br />
                              <InputGroup className="mb-3">
                                <FormControl
                                  type={passwordShown ? "text" : "password"}
                                  name="password"
                                  placeholder="Enter Password"
                                  id="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-width"
                                />
                                <InputGroup.Text
                                  id="basic-addon2"
                                  onClick={togglePasswordVisibility}
                                >
                                  {passwordShown ? (
                                    <FontAwesomeIcon
                                      icon={faEyeSlash}
                                      size="sm"
                                    />
                                  ) : (
                                    <FontAwesomeIcon icon={faEye} size="sm" />
                                  )}
                                </InputGroup.Text>
                              </InputGroup>
                              <ErrorMessage
                                name="password"
                                component="span"
                                className="error text-danger"
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={6} xs={12}>
                            <Form.Group className="form-row mb-3">
                              Confirm Password
                              <span className="text-danger">*</span>
                              <br />
                              <InputGroup className="mb-3">
                                <FormControl
                                  type={
                                    confirmPasswordShown ? "text" : "password"
                                  }
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  id="confirmPassword"
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-width"
                                />
                                <InputGroup.Text
                                  id="basic-addon2"
                                  onClick={tooglePasswordVisibility}
                                >
                                  {confirmPasswordShown ? (
                                    <FontAwesomeIcon
                                      icon={faEyeSlash}
                                      size="sm"
                                    />
                                  ) : (
                                    <FontAwesomeIcon icon={faEye} size="sm" />
                                  )}
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
                        <div className="row d-flex justify-content-center">
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            className="d-flex justify-content-center"
                          >
                            <div className="row">
                              <Row>
                                <ButtonGroup>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    className="btn-success btn-submit btn-danger my-2 me-2"
                                    disabled={isSubmit}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                  type="submit"
                                    // Add this line
                                    variant="contained"
                                    className="btn-primary btn-cancel my-2"
                              
                                  >
                                    Update
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </div>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </Row>
      </Container>

      {/* </MuiPickersUtilsProvider> */}
    </Container>
  );
};

export default EditStudentDetails;
