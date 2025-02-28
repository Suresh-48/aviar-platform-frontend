import React, { useState } from "react";
import { Col, Container, Row, Form, InputGroup, Card, Button, Modal } from "react-bootstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import './CSS/Login.css';
import PublicFooter from "./PublicLayout/PublicFooter";
import curveImg from "./curveImg.png";
import aviarImag from "./aviarImg.png.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link,NavLink, useNavigate  } from "react-router-dom";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleAccount from './Account/GoogleAccount';
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
    console.log("Form data", values);
    navigate("/student/dashboard");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
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
         <div className="Content-link">
          <p className="links mx-4" onClick={() => navigate("/course/search")}>
            Courses
          </p>
          <p className="links mx-4">Trainers</p>
          <p className="links mx-4">About Us</p>
          <p className="links mx-4">Help</p>
        </div>
      <div className="Aviarlogo">
        <div className="text-center">
          <img src={aviarImag} alt=" " />
        </div>
     
        <div className="curveImg">
          <img src={curveImg} alt=" " />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
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
            <div>
              <PublicFooter/>
            </div>
          </Container>

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
