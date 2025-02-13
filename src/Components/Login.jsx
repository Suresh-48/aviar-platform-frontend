import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, InputGroup,Card,Button} from "react-bootstrap";
import { Formik, ErrorMessage,Field, } from "formik";
// import {  Link } from "react-router-dom";
import * as Yup from "yup";
import './css/Login.css';

import curveImg from "./curveImg.png";
import aviarImag from "./aviarImg.png.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

 const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
    const initialValues = {
        email: "",
        password: "",
      };
      const [passwordShown, setPasswordShown] = useState(false);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
        console.log("From data".values);
      };
  return (
    <div className="Login-container">
       <div className="Aviarlogo">
       
        <div className="text-center">
          
                   <img src={aviarImag} alt=" "  /> 
                   </div>
                   <div className="Content-link">
                   
                    
                   <p className="links mx-4" onClick={() => history.push("/course/search")}>
              Courses 
            </p>
            <p className="links mx-4" >
              Trainers
            </p>
            <p className="links mx-4" >
              About Us
            </p>
            <p className="links mx-4" >
              Help
            </p>
            
                  
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
       {/* <Col lg={6} md={7} sm={12} className=" p-5 m-auto shadow -sm rounded-lg my-4  teacer-sign-background"> */}
       {({ handleSubmit }) => (
    <Container>
          <Card
            className="p-5 bg-light rounded shadow col-5  mx-auto mt-5 mb-5 "
            style={{}}
          >
    <Form onSubmit={handleSubmit}>
        {/* <Field
        name="google"
            type="text"
            className="form-control"
        /> */}
        
            <h4  
             className="d-flex justify-content-center mb-2"
         style={{ fontFamily: "none", fontWeight: "bold" }}
                      >
                        Login
                      </h4>
                      <div className="pt-3">
                        <form-control>

                        </form-control>
                          
                    
                      </div>
                      <hr className="or-divider my-4" />

            <label> Email </label> 
            <span className="text-danger">*</span>

    <Field
     name="email"
     type="text"
     placeholder="Email Address"
     className="form-control"
         />
     <ErrorMessage name="email" component="span" className="error text-danger error-message" />
      
          <br/>
          <label>  password  </label>
          <span className="text-danger">*</span>
          <InputGroup>
                <InputGroup.Text
                  style={{
                    width: "100%",
                    padding: "1px",
                    background:"white"
                  }}
                >
                  <Field
                    name="password"
                    type="text"
                    placeholder="Enter your password"
                    className="form-control"
                    // value={values.password}
                    // onChange={handleChange}
                    // onBlur={handleBlur}

                    style={{ border: "none", background: "inherit" }}
                  />
                  <div>
                  
                    <FontAwesomeIcon  icon={passwordShown ? faEye : faEyeSlash}/>
                    {/* onClick={tooglePasswordVisibility} */}

                  </div>
                </InputGroup.Text>
              </InputGroup>
              
              <ErrorMessage
                className="text-danger"
                name="password"
                component="div"
              />

 
     <br />         
     <Button  type="submit"  className="btn btn-primary p-1 col-12" variant="container" style={{}} >
    
    
                
           login </Button>
           
              <br />
              <br />
              <div className="  float-end text-primary">
              <a  className="login-button sign-up-button ms-2">
                 Forget password ?
                </a>
            
              </div>
              <hr className="or-divider my-5 "  />
                      <div className="d-flex flex-direction-row text-center">
                        <text className="login-button ">
                          Don't have an account?
                          <a  className="login-button sign-up-button ms-1">
                            Sign Up
                          </a>
                        </text>
                      </div>     
                        
                        
 </Form>
          </Card>
 
    </Container>
       )}
      
  </Formik>
  </div>
  )
}
export default Login;
