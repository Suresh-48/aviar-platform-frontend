import React, { useState } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Button, Modal } from "react-bootstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import './CSS/Login.css';
import axios from "axios";
import { toast } from "react-toastify";

import NavbarLoginBefore from "./PublicLayout/navbar";
import aviar from "./Images/aviar.png";
// import curveImg from "./curveImg.png";
// import aviarImag from "./aviarImg.png.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
 
    axios.post(`http://localhost:3000/api/v1/user/login`,{
      email: values.email,
      password: values.password,

    }).then((response)=>{
      console.log("response",response.data.updateToken); 
      console.log("response",response.data.updateToken.role);
      if(response.status === 200){  
        
        localStorage.setItem("token", response.data.updateToken.token);
        localStorage.setItem("role",response.data.updateToken.role);
        localStorage.setItem("userId", response.data.updateToken.id)

        toast.success(response.data);
        navigate("/admin/dashboard");
      }
    }).catch((error)=>{
      if(error.status === 400){
        console.log("error.....",error.response.data.message);
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
        <NavbarLoginBefore />
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
              <div className="landing-page-footer-background css">
                <Container className="p-4 w-100">
                  <Row>
                    <Col className=" mb-3">
                      <div>
                        <img src={aviar} width="30%" height="30" className="d-inline-block align-top mt-3" alt="logo" />
                      </div>
                      <div
                        className="d-flex flex-direction-row mt-2"
                        onClick={() => {
                          window.open("https://www.google.com/maps/place/AVIAR+Technology+Services/@12.2579188,79.0644428,687m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bacc1d66f0545e3:0xa3c31606e7dae377!8m2!3d12.2579136!4d79.0670177!16s%2Fg%2F11mv4wd0_r?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D", "_blank");
                        }}
                      >
                        <FontAwesomeIcon icon={faLocationDot} width={"20px"} className="mt-1 me-1 footer-map" color="#3f51b5" />

                        <text className="footer-font footer-map">Tiruvannamalai, </text>
                        <text className="footer-font footer-map">Tamilnadu</text>
                      </div>
                      <div className="d-flex flex-direction-row mt-2">
                        {/* <FontAwesomeIcon icon={faPhone} width={"20px"} className="mt-1 me-1" color="#3f51b5" /> */}
                        <b className="footer-font">

                        </b>
                      </div>
                      <div className="d-flex flex-direction-row mt-2">
                        <FontAwesomeIcon icon={faEnvelope} className="mt-1 me-1" color="#3f51b5" width={"20px"} />{" "}
                        <b className="footer-font">
                          <a href="mailto:aviartechservices.com" className="footer-text-decoderation linkColor">
                            avairtechservices.com
                          </a>
                        </b>
                      </div>
                    </Col>
                    <Col className="mt-2">
                      <div>
                        <b>Explore</b>
                        <br />
                        <b>
                          <a href="/login" className="footer-font-size">
                            Courses
                          </a>
                        </b>
                        <br />
                        <b>
                          <a href="/trainers" className="footer-font-size">
                            Trainers
                          </a>
                        </b>
                        <br />
                        <b>
                          <a href="/about-us" className="footer-font-size">
                            About Us
                          </a>
                        </b>
                        <br />
                        <b>
                          <a href="/terms-of-use" className="footer-font-size">
                            Terms of use
                          </a>
                        </b>
                        <br />
                        <b>
                          <a href="privacy-policy" className="footer-font-size">
                            Privacy Policy
                          </a>
                        </b>
                      </div>
                    </Col>
                    <Col className="mt-2">
                      <div>
                        <b>Account</b> <br />
                        <b>
                          <a href="/login" className="footer-font-size">
                            Login
                          </a>
                        </b>
                      </div>
                    </Col>
                    <Col className="mt-4">
                      <div>
                        <b>Stay Connected</b> <br />
                        <div>
                          <a href="#facebook" className="footer-font-size d-flex flex-direction-row">
                            <FontAwesomeIcon className="me-2 mt-1" icon={faFacebook} />
                            Facebook
                          </a>
                        </div>
                        <div>
                          <a href="#instagram" className="footer-font-size d-flex flex-direction-row">
                            <FontAwesomeIcon className="me-2 mt-1" icon={faInstagram} />
                            Instagram
                          </a>
                        </div>
                        <div>
                          <a href="#twitter" className="footer-font-size d-flex flex-direction-row">
                            <FontAwesomeIcon className="me-1 mt-1" icon={faTwitter} />
                            Twitter
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr className="my-2 mb-2" />
                  <div className="text-center copy-rights ">
                    &copy; {new Date().getFullYear()} Aviar Team
                    Designed by{" "}
                    <a
                      onClick={() => {
                        window.open("https://aviartechservices.com/");
                      }}
                      className="footer-text-decoderation"
                    >
                      Aviar Technology Services
                    </a>
                  </div>
                </Container>
              </div>
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
