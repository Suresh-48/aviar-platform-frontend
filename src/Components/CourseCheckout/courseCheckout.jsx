import React, { useEffect, useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  FormControl, 
  Modal, 
  Spinner, 
  InputGroup 
} from "react-bootstrap";
import Select from "react-select";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/core/Loader";
import { Button } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "../CourseCheckout/inner-component/CardSection.jsx";
// Styles
import "../../css/CourseCheckout.css";

import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

// Api
import Api from "../../Api";

// Components
import Label from "../../components/core/Label";
import { toast } from "react-toastify";
import states from "../../components/core/States";
// Roles
import { ROLES_STUDENT } from "../../Constants/Role";
import { customStyles } from "../core/Selector";

// Validations
const SignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be In Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("First Name as displayed in Credit Card"),

  lastName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be In Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("Last Name as displayed in Credit Card"),

  address1: Yup.string().required("Address 1 Is Required"),

  address2: Yup.string().nullable(),

  state: Yup.object().required("State Is Required"),

  city: Yup.object().required("City Is Required"),

  zipCode: Yup.string()
    .matches(/^\d{5}$/, "Zip Code Must Be 5 Digits")
    .required("Zip Code Is Required")
    .nullable(),

  phone: Yup.string()
    .matches(/^[0-9\s]+$/, "Enter Valid Phone Number")
    .min(10, "Enter valid number")
    .max(10, "Enter valid number")
    .required("Phone Number Is Required"),

  email: Yup.string().email("Enter Valid Email").required("Email Is Required"),
});

const CourseCheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [scheduleDetail, setScheduleDetail] = useState(
    location?.state?.scheduleDetail || location?.state?.scheduleId
  );

  const [courseId, setCourseId] = useState(location?.state?.courseId);
  const [scheduleId, setScheduleId] = useState(
    location?.state?.scheduleId?.id || location?.state?.scheduleId
  );
  const [payment, setPayment] = useState(
    location?.state?.coursePayment || location?.state?.lessonPayment
  );
  const [lessonIds, setLessonIds] = useState(location?.state?.lessonIds);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [errorText, setErrorText] = useState(" ");
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState("");
  const [userStudentId, setUserStudentId] = useState("");
  const [studentAddress, setStudentAddress] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stateCode, setStateCode] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cityValue, setCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [checked, setChecked] = useState(false);

  // Log out
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Get Student Address
  const getStudentAddress = async () => {
    const studentId = localStorage.getItem("studentId");
    const userId = localStorage.getItem("userId");
    
    try {
      const response = await Api.get(`api/v1/student/${studentId}`, { 
        headers: { userId: userId } 
      });
      
      const data = response.data.data.getOne;
      setStudentAddress(data);
      setFirstName(data?.firstName || "");
      setLastName(data?.lastName || "");
      setAddress1(data?.address1 || "");
      setAddress2(data?.address2 || "");
      setPhone(data?.phone || "");
      setEmail(data?.email || "");
      setCity(data?.city ? { value: data?.city, label: data?.city } : "");
      setCityValue(data?.city || "");
      setState(data?.state ? { value: data?.state, label: data?.state } : "");
      setStateValue(data?.state || "");
      setZipCode(data?.zipCode || "");
      setIsLoading(false);
    } catch (error) {
      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        logout();
        toast.error("Session Timeout");
      }
      setIsLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const initializeData = async () => {
      const role = localStorage.getItem("role");
      const studentId = localStorage.getItem("studentId");
      setRole(role);
      setUserStudentId(studentId);
      
      await getStudentAddress();
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // Submit Form post data to backend
  const submit = async (values, { resetForm }) => {
    if (!stripe || !elements) {
      toast.error("Stripe not initialized");
      return;
    }

    setShow(true);
    setIsSubmit(true);

    const card = elements.getElement(CardElement);
    const userId = localStorage.getItem("userId");
    
    try {
      // Check if student can enroll in schedule
      await Api.get("api/v1/student/upcomingSchedule/check", {
        params: {
          courseScheduleId: scheduleId,
          studentId: userStudentId,
          ...(lessonIds && { lessonId: lessonIds }),
          userId: userId,
        },
      });

      const email = values.email.toLowerCase();
      const endpoint = lessonIds 
        ? "/api/v1/billing/lesson/strip/payment" 
        : "/api/v1/billing/strip/payment";

      // Create payment intent
      const paymentResponse = await Api.post(endpoint, {
        currency: "inr",
        price: payment * 100,
        studentId: userStudentId,
        courseId: courseId,
        courseScheduleId: scheduleId,
        ...(lessonIds && { lessonId: lessonIds }),
      });

      const data = paymentResponse.data;
      
      // Confirm card payment
      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            address: {
              city: cityValue,
              country: "us",
              line1: values.address1,
              line2: values.address2,
              postal_code: values.zipCode,
              state: stateValue,
            },
            email: email,
            name: values.firstName,
            phone: values.phone,
          },
        },
      });

      if (confirmPayment.error) {
        throw new Error("Payment Failed");
      }

      // Save billing information
      const billingEndpoint = lessonIds 
        ? "api/v1/billing/checkout/lesson/student" 
        : "api/v1/billing/paybill/student";

      await Api.post(billingEndpoint, {
        firstName: values.firstName,
        lastName: values.lastName,
        address1: values.address1,
        address2: values.address2,
        email: values.email,
        city: cityValue,
        state: stateValue,
        zipCode: values.zipCode,
        phone: values.phone,
        studentId: userStudentId,
        courseId: courseId,
        courseScheduleId: scheduleId,
        payment: payment,
        ...(lessonIds && { lessonId: lessonIds }),
      });

      // Add to upcoming list
      await Api.post("api/v1/student/upcomingList", {
        studentId: userStudentId,
        courseId: courseId,
        courseScheduleId: scheduleId,
      });

      resetForm({ values: "" });
      setIsProcessing(false);

    } catch (error) {
      console.error("Payment error:", error);
      setShow(false);
      setIsSubmit(false);
      setView(true);
      
      if (error.response?.data?.message) {
        setErrorText(error.response.data.message);
      } else if (error.message) {
        setErrorText(error.message);
      } else {
        setErrorText("Payment failed. Please try again.");
      }

      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        logout();
        toast.error("Session Timeout");
      }
    }
  };

  // Handle Modal
  const handleModal = () => {
    setShow(!show);
  };

  const handleStateChange = (selectedState) => {
    for (let i = 0; i < states.length; i++) {
      if (states[i].state === selectedState.value) {
        setStateCode(i);
        break;
      }
    }
    setState(selectedState);
    setStateValue(selectedState.value);
    setCityValue("");
    setCity("");
  };

  const handleCityChange = (selectedCity) => {
    setCityValue(selectedCity.value);
    setCity(selectedCity);
  };

  // Toggle billing info checkbox
  const toggleBillingInfo = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    
    if (newChecked) {
      getStudentAddress();
    } else {
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setPhone("");
      setEmail("");
      setCity("");
      setState("");
      setZipCode("");
      setStateCode(0);
      setCityValue("");
      setStateValue("");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Container className="mt-1">
        <div className="d-flex">
          <h4 className="mx-3 mb-0">Billing Information</h4>
          <div className="user-value">
            <h6 className="purchased-course mx-3 mb-0 fw-bold">
              {scheduleDetail?.courseId?.name}
            </h6>
            -
            <h6 className="purchased-course mx-3 mb-0 fw-bold">
              {scheduleDetail?.courseId?.category?.name}
            </h6>
            <h6 className="purchased-course mb-0">
              {`${scheduleDetail?.startTime} ${scheduleDetail?.endTime}`}
            </h6>
          </div>
        </div>
        
        <Row>
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName,
              lastName,
              address1,
              address2,
              email,
              state,
              city,
              zipCode,
              phone,
            }}
            validationSchema={SignInSchema}
            onSubmit={submit}
          >
            {({ setFieldValue, handleSubmit, handleBlur, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="px-3">
                  <Col xs={12} className="checkbox-content d-flex justify-content-start align-items-center">
                    <Form.Group className="form-row mt-4">
                      <Form.Check
                        className="checkbox-style"
                        type="checkbox"
                        label="Billing Information Same As Registration Information"
                        checked={checked}
                        onChange={toggleBillingInfo}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="px-3 pt-2">
                  <Col sm={6}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>First Name</Label>
                      <FormControl
                        type="text"
                        name="firstName"
                        placeholder="First Name as displayed in Credit card"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>Last Name</Label>
                      <FormControl
                        type="text"
                        name="lastName"
                        placeholder="Last Name as displayed in Credit card"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="px-3 pt-2">
                  <Col sm={6}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>Address Line 1</Label>
                      <FormControl
                        type="text"
                        name="address1"
                        placeholder="Address Line 1"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="address1"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="form-row">
                      <Label>Address Line 2</Label>
                      <FormControl
                        type="text"
                        name="address2"
                        placeholder="Address Line 2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="address2"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="px-3 pt-2">
                  <Col sm={6}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>Email</Label>
                      <FormControl
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>Phone Number</Label>
                      <InputGroup>
                        <InputGroup.Text>+1</InputGroup.Text>
                        <FormControl
                          maxLength="10"
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={handleBlur}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="px-3 pt-2">
                  <Col sm={4}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>State</Label>
                      <Select
                        value={state}
                        styles={customStyles}
                        name="state"
                        placeholder="State"
                        onChange={handleStateChange}
                        options={states.map((item) => ({
                          label: item.state,
                          value: item.state,
                        }))}
                      />
                      <ErrorMessage
                        name="state"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>City</Label>
                      <Select
                        placeholder="City"
                        styles={customStyles}
                        value={city}
                        name="city"
                        onChange={handleCityChange}
                        options={states[stateCode]?.cities?.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                      <ErrorMessage
                        name="city"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group className="form-row mb-2">
                      <Label notify>Zip Code</Label>
                      <FormControl
                        type="text"
                        name="zipCode"
                        maxLength="5"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="zipCode"
                        component="span"
                        className="error text-danger error-message m-0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <CardSection />
                </Row>

                <div className="d-flex justify-content-end mt-4 px-3 mb-4">
                  <Button
                    disabled={!isValid || isSubmit || !stripe}
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      backgroundColor: (!isValid || isSubmit || !stripe) ? '#6c757d' : '#1976d2',
                      '&:hover': {
                        backgroundColor: (!isValid || isSubmit || !stripe) ? '#6c757d' : '#1565c0',
                      }
                    }}
                  >
                    Pay Now ${payment}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Row>

        {/* Processing Modal */}
        <Modal show={show} backdrop="static" keyboard={false} centered onHide={handleModal}>
          <Modal.Body>
            <Row>
              {isProcessing ? (
                <div className="processing-content">
                  <Spinner animation="grow" variant="secondary" />
                  <h4 style={{ paddingLeft: 20 }}>Processing...</h4>
                </div>
              ) : (
                <div>
                  <div className="success-content">
                    <p className="payment-success-style">Payment Success!</p>
                  </div>
                  <div className="ok-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go To Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </Row>
          </Modal.Body>
        </Modal>

        {/* Error Modal */}
        <Modal show={view} backdrop="static" keyboard={false} centered onHide={() => setView(false)}>
          <Modal.Body>
            <Row>
              <div className="payment-details">
                <FaExclamationCircle size={40} />
              </div>
              <h5 className="text-center">{errorText}</h5>
            </Row>
          </Modal.Body>
          <div className="ok-button-container">
            <Button variant="contained" color="primary" onClick={() => setView(false)}>
              Retry
            </Button>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default CourseCheckoutScreen;