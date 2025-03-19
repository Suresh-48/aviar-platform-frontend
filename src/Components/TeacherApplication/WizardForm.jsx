import React, { useState, useContext } from "react";
import { FormProvider, FormContext } from "./FormContext";
import Stepper from "react-stepper-horizontal";
import { Col, Container, Row, Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

// Components
import Education from "./Education";
import Experience from "./Experience";
import OnlineProfileDetails from "./OnlineProfile";
import ApplicationFormConfirmation from "./ApplicationFormConfirmation"; // Ensure this component exists

// API (uncomment and implement as needed)
// import Api from "../../Api";

const Form = () => {
  const [value] = useContext(FormContext);
  const [errorsShow, setErrorShow] = useContext(FormContext);
  const [teacherId, setTeacherId] = useState("");
  // const history = useHistory();
  const [show, setShow] = useState(false);
  const userId = localStorage.getItem("userId");

  // Logout function
  const logout = () => {
    localStorage.clear();
    history.push("/kharpi");
    window.location.reload();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const sections = [
    { title: "Education", onClick: () => setCurrentPage(1) },
    { title: "Experience", onClick: () => setCurrentPage(2) },
    { title: "Online Profile", onClick: () => setCurrentPage(3) },
    { title: "Application Form Confirmation", onClick: () => setCurrentPage(4) },
  ];

  // Fetch teacher data (uncomment and implement as needed)
  // useEffect(() => {
  //   const teacherId = localStorage.getItem("teacherId");
  //   Api.get(`api/v1/teacherApplication/${teacherId}`, {
  //     headers: { userId: userId },
  //   })
  //     .then((response) => {
  //       const data = response.data.getTeacherApplication;
  //       // Handle data
  //     })
  //     .catch((error) => {
  //       if (error?.response?.status === 401) {
  //         logout();
  //         toast.error("Session Timeout");
  //       }
  //     });
  //   setTeacherId(teacherId);
  // }, []);

  const handleModal = () => setShow(!show);

  const handleConfirm = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationStatus = "Review";

    // API call to submit application (uncomment and implement as needed)
    // Api.post(`api/v1/teacherApplication`, {
    //   teacherId: teacherId,
    //   education: value.educationData,
    //   experience: value.experienceData,
    //   profile: value.profileData,
    //   userId: userId,
    // })
    //   .then((response) => {
    //     if (response.status === 201) {
    //       toast.success("Updated Successfully");
    //       history.push("/teacher/application/details");
    //       window.location.reload();
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status >= 400) {
    //       toast.error(error.response.data.message);
    //     }
    //     if (error?.response?.status === 401) {
    //       logout();
    //       toast.error("Session Timeout");
    //     }
    //   });
  };

  const EducationValidation = () => {
    // Add validation logic for education (uncomment and implement as needed)
    // let res = educationSchema(value);
    // if (res === true) {
    //   setCurrentPage((prev) => prev + 1);
    // }
  };

  const ExperienceValidation = () => {
    // Add validation logic for experience (uncomment and implement as needed)
    // let res = experienceSchema(value);
    // if (res === true) {
    //   setCurrentPage((prev) => prev + 1);
    // }
  };

  const prev = () => setCurrentPage((prev) => prev - 1);
  const next = () => setCurrentPage((prev) => prev + 1);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stepper
          steps={sections}
          activeStep={currentPage - 1}
          activeColor="red"
          defaultBarColor="red"
          completeColor="green"
          completeBarColor="green"
        />

        {currentPage === 1 && (
          <>
            <Education />
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="contained"
                color="primary"
                type="button"
                style={{ width: "15%" }}
                onClick={EducationValidation}
              >
                NEXT
              </Button>
            </div>
          </>
        )}

        {currentPage === 2 && (
          <>
            <Experience />
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
                onClick={ExperienceValidation}
              >
                NEXT
              </Button>
            </div>
          </>
        )}

        {currentPage === 3 && (
          <>
            <OnlineProfileDetails />
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
                className="me-2"
                style={{ width: "15%" }}
                onClick={next}
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
            <Modal show={show} onHide={handleModal} centered>
              <Modal.Body>
                <div className="container py-3">
                  <div className="row flex-direction-row">
                    <p>
                      Please verify the details before submitting the
                      application. Do you want to submit the application?
                    </p>
                  </div>
                  <div className="mt-3">
                    <Row className="button-content-style">
                      <Col xs={6} sm={6} md={6}>
                        <Button
                          type="submit"
                          fullWidth
                          className="Kharpi-cancel-btn"
                          style={{ width: "100%", borderRadius: 5 }}
                          onClick={handleModal}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col xs={6} sm={6} md={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
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
      </form>
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