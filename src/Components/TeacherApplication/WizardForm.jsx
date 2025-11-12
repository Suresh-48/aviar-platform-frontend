import React, { useState, useContext, useEffect } from "react";
import { FormProvider, FormContext } from "./FormContext";
import Stepper from "react-stepper-horizontal";
import { Col, Container, Row, Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import Api from "../../Api";

// Components
import Education from "./Education";
import Experience from "./Experience";
import OnlineProfileDetails from "./OnlineProfile";
import ApplicationFormConfirmation from "./ApplicationFormConfirmation";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [value, setValue] = useContext(FormContext);
  const [teacherId, setTeacherId] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const user = localStorage.getItem('user');
  const parsed = JSON.parse(user);
  // console.log(parsed,"parsed......")
  const userId = parsed.id;

  const sections = [
    { title: "Education", onClick: () => setCurrentPage(1) },
    { title: "Experience", onClick: () => setCurrentPage(2) },
    { title: "Online Profile", onClick: () => setCurrentPage(3) },
    { title: "Confirmation", onClick: () => setCurrentPage(4) },
  ];

  // Logout function
  const logout = () => {
    localStorage.clear();
    window.location.href = "/kharpi";
  };

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) return;
    setTeacherId(teacherId);


    Api.get(`api/v1/teacherApplication/${teacherId}`, {
      headers: { userId },
    })
      .then((response) => {
        const data = response.data.getTeacherApplication;
        if (data) {
          setValue((prev) => ({
            ...prev,
            educationData: data.education || prev.educationData,
            experienceData: data.experience || prev.experienceData,
            profileData: data.profile || prev.profileData,
          }));
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  }, []);


 



  const handleModal = () => setShow(!show);

  const handleConfirm = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationStatus = "Review";

    Api.post(`api/v1/teacherApplication`, {
      teacherId,
      education: value.educationData,
      experience: value.experienceData,
      profile: value.profileData,
      userId,
      applicationStatus,
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Updated Successfully");
          // window.location.href = "/teacher/application/details";
          navigate("/teacher/application/details")
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          toast.error(error?.response?.data?.message || "Error submitting form");
        }
      });
  };

  const EducationValidation = () => setCurrentPage(2);
  const ExperienceValidation = () => setCurrentPage(3);
  const prev = () => setCurrentPage((prev) => prev - 1);
  const next = () => setCurrentPage((prev) => prev + 1);

  return (
    <Container>
      {/* <form onSubmit={handleSubmit}> */}
      <Stepper
        steps={sections}
        activeStep={currentPage - 1}
        activeColor="red"
        defaultBarColor="red"
        completeColor="green"
        completeBarColor="green"
      />

      {currentPage === 1 && (
        <Education
          onFormValidityChange={(isValid) => {
            // You can handle validation state globally if needed
          }}
          setEducationData={(data) => {
            setValue((prev) => ({
              ...prev,
              educationData: [data], // Store in global form context
            }));
          }}
          onSubmit={() => setCurrentPage(2)} // Go to next step
        />
      )}


      {currentPage === 2 && (
        <>
          <Experience
            onFormValidityChange={(isValid) => {
              console.log("Experience form valid:", isValid);
            }}
            setExperienceData={(data) => {
              setValue((prev) => ({
                ...prev,
                experienceData: [data],
              }));
            }}
            onSubmit={() => setCurrentPage(3)} // move to next step
          />

          <div className="d-flex justify-content-end mt-5">
            <Button
              type="button"
              className="me-2 Kharpi-cancel-btn"
              style={{ width: "15%" }}
              onClick={prev}
            >
              Back
            </Button>
          </div>
        </>
      )}


      {currentPage === 3 && (
        <>
          <OnlineProfileDetails
            onFormValidityChange={(isValid) => {
              // track validity globally if needed
            }}
            setOnlineProfileData={(data) => {
              setValue((prev) => ({
                ...prev,
                onlineProfileData: [data],
              }));
            }}
            onSubmit={() => setCurrentPage(4)} // move to next step
          />

          <div className="d-flex justify-content-end mt-5">
            <Button
              type="button"
              className="me-2 Kharpi-cancel-btn"
              style={{ width: "15%" }}
              onClick={prev}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              style={{ width: "15%" }}
              onClick={() => {
                // optionally trigger form validation manually
              }}
            >
              NEXT
            </Button>
          </div>
        </>
      )}



      {currentPage === 4 && (
        <>
          <ApplicationFormConfirmation />
          <Row>
            <Col>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  color="primary"
                  type="button"
                  className="me-2 Kharpi-cancel-btn"
                  style={{ width: "15%" }}
                  onClick={prev}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  style={{ width: "15%" }}
                  onClick={handleConfirm}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>

          {/* Confirmation Modal */}
          <Modal show={show} onHide={handleModal} centered>
            <Modal.Body>
              <div className="container py-3">
                <div className="row">
                  <p>
                    Please verify the details before submitting the
                    application. Do you want to submit the application?
                  </p>
                </div>
                <div className="mt-3">
                  <Row>
                    <Col xs={6}>
                      <Button
                        fullWidth
                        className="Kharpi-cancel-btn"
                        style={{ width: "100%", borderRadius: 5 }}
                        onClick={handleModal}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
      {/* </form> */}
    </Container>
  );
};

export default function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}
