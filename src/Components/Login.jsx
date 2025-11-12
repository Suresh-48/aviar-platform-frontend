import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  InputGroup,
  Modal,
  Form,
  Row,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthContext } from "../context/AuthContext"; // ✅ import context
import "./CSS/Login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ login from context

  // 🔁 Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      switch (role) {
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "teacher":
          navigate("/teacher/dashboard", { replace: true });
          break;
        case "student":
          navigate("/student/dashboard", { replace: true });
          break;
        default:
          navigate("/");
      }
    }
  }, [navigate]);

  // ✏️ Form initial values
  const initialValues = { email: "", password: "" };

  // ✅ Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Weak password"
      )
      .required("Password is required"),
  });

  // 🔐 Handle submit
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        values
      );

      if (res.status === 200) {
        const data = res.data.updateToken;

        const userData = {
          id: data.id,
          role: data.role,
          token: data.token,
          studentId: data.studentId,
          teacherId: data.teacherId,
        };

        login(userData); // ✅ Save to context + localStorage
        toast.success("Login successful!");

        switch (data.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "teacher":
            navigate("/teacher/dashboard");
            break;
          case "student":
            navigate("/student/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed!";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-5 bg-light shadow-lg rounded col-12 col-md-6 col-lg-4">
          <h3 className="text-center fw-bold mb-4 text-primary">Login</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                      />
                    </Button>
                  </InputGroup>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                  />
                </Form.Group>

                {/* Submit */}
                <Button
                  type="submit"
                  className="col-12 mt-3"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <div className="text-end mt-2">
                  <Link to="/forget/password" className="text-primary">
                    Forgot password?
                  </Link>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <p>
                    Don’t have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none fw-semibold"
                      onClick={() => setShowModal(true)}
                    >
                      Sign up
                    </Button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>

      <Footer />

      {/* ✨ Signup Modal */}
      <Modal show={showModal} size="md" centered onHide={() => setShowModal(false)}>
        <Card className="border-0 shadow-lg rounded-4">
          <Modal.Header
            className="border-0 d-flex justify-content-center pt-4"
            closeButton
          >
            <Modal.Title className="fw-bold fs-4 text-primary">
              Choose Your Role
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4 pb-4">
            <div className="d-flex flex-column gap-3 mt-3">
              {/* <Link
                to="/parent/signup"
                className="signup-option d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
              >
                <div className="icon-circle bg-primary text-white">
                  <i className="fa-solid fa-user-group"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">Signup as Parent</h6>
                  <small className="text-muted">
                    Manage your child’s learning journey
                  </small>
                </div>
              </Link> */}

              <Link
                to="/student/signup"
                className="signup-option d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
              >
                <div className="icon-circle bg-success text-white">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">Signup as Student</h6>
                  <small className="text-muted">
                    Start learning and track progress
                  </small>
                </div>
              </Link>

              <Link
                to="/teacher/signup"
                className="signup-option d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none"
              >
                <div className="icon-circle bg-warning text-white">
                  <i className="fa-solid fa-chalkboard-teacher"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">Signup as Teacher</h6>
                  <small className="text-muted">
                    Share knowledge and manage classes
                  </small>
                </div>
              </Link>
            </div>
          </Modal.Body>

          <Modal.Footer className="border-0 pb-4">
            <Button
              variant="outline-secondary"
              className="rounded-pill w-100 fw-semibold"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Card>
      </Modal>
    </div>
  );
};

export default Login;
