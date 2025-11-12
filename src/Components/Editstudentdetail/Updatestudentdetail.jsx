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
import moment from "moment";
import Api from "../../Api";
import "../CSS/Student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import states from "../Core/States";
import profile from "../Images/NoProfile.png";
import axios from "axios";

const EmailSignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("First Name Is Required"),
});

const GoogleAndFacebookSignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Z]/, "First Letter Must Be Capital")
    .matches(/^[aA-zZ\s]+$/, "Enter Valid Name")
    .required("First Name Is Required"),
});

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const EditStudentDetails = (props) => {
  const [details, setDetails] = useState([]);
  const [studentId, setStudentId] = useState();
  const [gender, setGender] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [cityValue, setCityValue] = useState("");
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
  const [imagePreview, setImagePreview] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const inputReference = useRef(null);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const tooglePasswordVisibility = () =>
    setConfirmPasswordShown(!confirmPasswordShown);

  const fileUploadAction = () => inputReference.current.click();

  // ✅ Convert file to base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // ✅ Upload file
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
      const base64 = await convertBase64(file);
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");

      const response = await axios.post(
        `http://localhost:3000/api/v1/student/profile/upload`,
        { studentId, image: base64, userId }
      );

      if (response.status === 201) {
        toast.success("Profile Uploaded Successfully!");
        setImagePreview(base64);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }

    e.target.value = "";
  };

  // ✅ Delete Image
  const removeImage = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");
      await Api.delete("api/v1/student/remove/profile", {
        params: { studentId, userId },
      });
      toast.success("Profile Removed");
      setImagePreview("");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to remove image");
    }
  };

  // ✅ Get Student Details
  const studentDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");
      const res = await Api.get(`api/v1/student/${studentId}`, {
        headers: { userId },
      });

      const data = res.data.data.getOne;
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
      setGender(data?.gender ? { value: data.gender, label: data.gender } : "");
      setZipCode(data.zipCode);
      setStateValue(data.state);
    } catch (error) {
      toast.error("Failed to load student details");
    }
  };

  useEffect(() => {
    studentDetails();
  }, []);

  // ✅ Submit Form
  const submitForm = async (values) => {
    try {
      const email = values.email.toLowerCase();
      const dateValue = moment(values.dob).format("ll");
      const gender = values.gender?.value || "";
      const City = values.city?.value || "";
      const state = values.state?.value || "";
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");

      const response = await Api.patch(
        `http://localhost:3000/api/v1/student/${studentId}`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName,
          dob: dateValue,
          gender,
          phone: values.phoneNumber,
          email,
          address1: values.address1,
          address2: values.address2,
          city: City,
          state,
          zipCode: values.zipCode,
          password: values.password,
          confirmPassword: values.confirmPassword,
          userId,
        }
      );

      if (response.status === 201) {
        toast.success("Updated Successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong while updating");
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

  // ✅ JSX Rendering
  return (
    <Container className="p-3">
      <Row className="py-0 profile-dropdown-status">
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName,
            lastName,
            middleName,
            dob,
            gender,
            phoneNumber: phone,
            email,
            address1,
            address2,
            state: stateValue,
            city: cityValue,
            zipCode,
            password,
            confirmPassword,
          }}
          validationSchema={
            details.logininType === "Email"
              ? EmailSignInSchema
              : GoogleAndFacebookSignInSchema
          }
          onSubmit={submitForm}
        >
          {(formik) => {
            const { values, handleChange, setFieldValue, handleSubmit, handleBlur } =
              formik;
            return (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col
                    lg={4}
                    className="d-flex justify-content-center px-4 pt-2"
                    style={{ backgroundColor: "#0000000a" }}
                  >
                    <Dropdown className="dropdown-profile-list">
                      <Dropdown.Toggle className="teacher-menu-dropdown p-0">
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
                            />
                          )}
                          <div className="d-flex justify-content-center mt-3">
                            <p style={{ fontSize: 11, color: "black" }}>
                              Click Here To Upload Profile
                            </p>
                            <FontAwesomeIcon icon={faPen} size="sm" color="#1d1464" />
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="profile-dropdown-status ms-4 py-0">
                        <Dropdown.Item>
                          <Link
                            to="#"
                            className="change-profile-text-style"
                            onClick={fileUploadAction}
                          >
                            Change Profile
                          </Link>
                        </Dropdown.Item>
                        <hr />
                        <Dropdown.Item>
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
                      accept="image/*"
                      ref={inputReference}
                      style={{ display: "none" }}
                      onChange={fileUploadInputChange}
                    />
                  </Col>

                  <Col lg={8} className="py-4 px-4">
                    {/* Form fields here (same as before) */}
                    <Button type="submit" className="btn-primary">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Row>
    </Container>
  );
};
}
export default EditStudentDetails;
