import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Label from "../../components/core/Label";
import Api from "../../Api";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SetPassword = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location?.state?.email);
  const [isSubmit, setIsSubmit] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const submitForm = async (values) => {
    setIsSubmit(true);
    const userId = localStorage.getItem("userId");
    
    try {
      const response = await Api.post("api/v1/user/change/password", {
        userId: userId,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      
      toast.success(response.data.status);
      navigate(-1); // Go back instead of history.goBack()
      setIsSubmit(false);
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(error.response.data.message);
        setIsSubmit(false);
      }
    }
  };

  const loginSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Old Password Should Be Minimum 8 Characters")
      .required("Old Password Is Required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@*#$%^&])/,
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "New Password Should Be Minimum 8 Characters")
      .required("New Password Is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords Doesn't Match")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*$%^&])/,
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "Confirm Password Should Be Minimum 8 Characters")
      .required("Confirm Password Is Required"),
  });

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col
          lg={5}
          md={6}
          sm={12}
          className="p-5 m-auto shadow-sm rounded-lg"
        >
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={loginSchema}
            onSubmit={submitForm}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur } = formik;
              return (
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <h3 className="d-flex justify-content-center mb-3">
                        Set Password
                      </h3>

                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Label notify={true}>Old Password</Label>
                          <InputGroup>
                            <FormControl
                              type={oldPasswordVisible ? "text" : "password"}
                              id="oldPassword"
                              name="oldPassword"
                              value={values.oldPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Old Password"
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
                                icon={oldPasswordVisible ? faEye : faEyeSlash}
                                onClick={toggleOldPasswordVisibility}
                                style={{ cursor: "pointer" }}
                                size="1x"
                              />
                            </InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            name="oldPassword"
                            component="span"
                            className="error text-danger"
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Label notify={true}>New Password</Label>
                          <InputGroup>
                            <FormControl
                              type={newPasswordVisible ? "text" : "password"}
                              name="newPassword"
                              id="newPassword"
                              value={values.newPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter New Password"
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
                                icon={newPasswordVisible ? faEye : faEyeSlash}
                                onClick={toggleNewPasswordVisibility}
                                style={{ cursor: "pointer" }}
                                size="1x"
                              />
                            </InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            name="newPassword"
                            component="span"
                            className="error text-danger"
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md="12">
                        <Form.Group className="mb-3">
                          <Label notify={true}>Confirm New Password</Label>
                          <InputGroup>
                            <FormControl
                              type={confirmPasswordVisible ? "text" : "password"}
                              name="confirmPassword"
                              id="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Confirm Password"
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
                                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ cursor: "pointer" }}
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

                      <div className="d-flex justify-content-end mt-3">
                        <Button
                          className="create-active Kharpi-save-btn"
                          type="submit"
                          disabled={isSubmit}
                        >
                          {isSubmit ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </Row>
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

export default SetPassword;