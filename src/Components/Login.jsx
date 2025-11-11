import React, { useState } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Button, Modal } from "react-bootstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import './CSS/Login.css';
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

import NavbarLoginBefore from "./PublicLayout/navbar";
import aviar from "./Images/aviar.png";
// import curveImg from "./curveImg.png";
// import aviarImag from "./aviarImg.png.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import { faYoutube, faFacebook, faTwitter, faInstagram, faMailchimp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Enter your email"),
    password: Yup.string()
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*$%^&])",
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "Password Required Minimum 8 Characters")
      .required("Password Is Required"),
  });
  const onSubmit = (values) => {

    axios.post(`http://localhost:3000/api/v1/user/login`, {
      email: values.email,
      password: values.password,

    }).then((response) => {

      console.log("response", response.data.updateToken.role);
      let userRole = "";

      if (values.email.includes("student")) {
        userRole = "student";
      } else if (values.email.includes("teacher")) {
        userRole = "teacher";
      } else {
        userRole = "admin";
      }
      if (response.status === 200) {

        localStorage.setItem("token", response.data.updateToken.token);
        localStorage.setItem("role", response.data.updateToken.role);
        localStorage.setItem("userId", response.data.updateToken.id)
        localStorage.setItem("studentId", response.data.updateToken.studentId);
        localStorage.setItem("teacherId", response.data.updateToken.teacherId);

        toast.success(response.data);
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else if (userRole === "teacher") {
          navigate("/teacher/dashboard");
        } else if (userRole === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/login"); // fallback
        }
      }
    }).catch((error) => {
      if (error.status === 400) {
        console.log("error.....", error.response.data.message);
        toast.error(error.response.data.message);
      }

    })
  };
  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };
  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  //   const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(
  //   <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  //     <React.StrictMode>
  //       <GoogleAccount />
  //     </React.StrictMode>
  //   </GoogleOAuthProvider>
  // );
  return (
    <div className="Login-container">

      <div className="Aviarlogo">
        <Navbar/>
        {/* <NavbarLoginBefore /> */}
        {/* <div className="text-center">
          <img src={aviarImag} alt=" " />
        </div>
     
        <div className="curveImg">
          <img src={curveImg} alt=" " />
        </div> */}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <Container>
              <Card className="p-5 bg-light rounded shadow col-5 mx-auto mt-5 mb-5">
                <Form onSubmit={handleSubmit}>
                  <h4 className="d-flex justify-content-center mb-2" style={{ fontFamily: "none", fontWeight: "bold" }}>
                    Login
                  </h4>
                  <div className="pt-3">
                    <form-control></form-control>
                  </div>
                  <hr className="or-divider my-4" />
                  <label> Email </label>
                  <span className="text-danger">*</span>
                  <Field name="email" type="text" placeholder="Email Address" className="form-control" />
                  <ErrorMessage name="email" component="span" className="error text-danger error-message" />
                  <br />
                  <label> Password </label>
                  <span className="text-danger">*</span>
                  <InputGroup>
                    <InputGroup.Text style={{ width: "100%", padding: "1px", background: "white" }}>
                      <Field
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        placeholder="Enter your password"
                        className="form-control"
                        style={{ border: "none", background: "inherit" }}
                      />
                      <div>
                        <FontAwesomeIcon
                          icon={passwordShown ? faEye : faEyeSlash}
                          onClick={tooglePasswordVisibility}
                          size="1x"
                        />
                      </div>
                    </InputGroup.Text>
                  </InputGroup>
                  <ErrorMessage className="text-danger" name="password" component="div" />
                  <br />
                  <Button type="submit" className="btn btn-primary p-1 col-12" variant="container">
                    Login
                  </Button>
                  <br />
                  <br />
                  <div className="float-end text-primary">
                    <Link to='/forget/password/'>Forget password ?</Link>
                  </div>
                  <hr className="or-divider my-5" />
                  <div className="d-flex flex-direction-row text-center">
                    <text className="login-button">
                      Don't have an account?
                      <a className="login-button sign-up-button ms-1" onClick={() => setVisible(true)}>
                        Sign Up
                      </a>
                    </text>
                  </div>
                </Form>
              </Card>
            </Container>
            <div>
             <Footer/>
            </div>
          </>


        )}
      </Formik>
      {/* Sign Up Modal */}
      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NavLink exact to="/Student/signup" activeClassName="main-nav-active-style">

            {/* <Link to ='Studentsignup'> */}
            <h4 className="signup" >Signup as Student</h4>
            {/* </Link> */}
          </NavLink>
          <Link to='/teacher/signup'>
            <h4 className="signup">Signup as Teacher</h4>
          </Link>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Login;
