import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import moment from "moment";
import Select from "react-select";
import TimezonePicker from "react-bootstrap-timezone-picker";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

// Using react-datepicker instead of MUI date pickers
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Api
import Api from "../../Api.jsx";

// Components
import Label from "../../components/core/Label";
import Loader from "../core/Loader.jsx";

// Styles
import "../../css/CreateCourseSchedule.css";
import { customStyles } from "../core/Selector.js";

const CreateCourseSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState("");
  const [courseName, setCourseName] = useState(location?.state?.courseName);
  const [courseId, setCourseId] = useState(location?.state?.courseId);
  const [weekly, setWeekly] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherNameSelect, setTeacherNameSelect] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [today] = useState(new Date());

  useEffect(() => {
    if (courseId) {
      getApprovedTeacher();
    } else {
      setIsLoading(false);
      toast.error("Course ID not found");
    }
  }, [courseId]);

  // Get Approved Teachers
  const getApprovedTeacher = () => {
    const userId = localStorage.getItem("userId");
    
    Api.get("/api/v1/teacher/list", {
      headers: { userId: userId }
    })
    .then((res) => {
      const data = res.data.teacherList || [];
      setTeacherList(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
      toast.error("Failed to fetch teachers list");
      setIsLoading(false);
    });
  };

  // Submit form
  const submitForm = (values) => {
    const userId = localStorage.getItem("userId");
    setIsSubmit(true);
    
    if (!startTime || !startDate) {
      toast.error("Please select start date and time");
      setIsSubmit(false);
      return;
    }

    const startTimeValue = moment(startTime).format("LT");
    const dateValue = moment(startDate).format("YYYY-MM-DD");

    const scheduleData = {
      courseId: courseId,
      weeklyOn: weekly,
      startTime: startTimeValue,
      timeZone: values.timeZone,
      endTime: endTime,
      totalStudentEnrolled: parseInt(values.enrollstudent),
      startDate: dateValue,
      teacherName: teacherNameSelect?.name,
      teacherId: teacherId,
      userId: userId,
    };

    Api.post("/api/v1/courseSchedule/createSchedule", scheduleData)
      .then((response) => {
        if (response.status === 201) {
          const scheduleId = response.data.scheduleDetails?.id;
          toast.success("Schedule created successfully");
          
          // Create teacher upcoming schedule
          if (teacherId) {
            Api.post("/api/v1/teacherUpcomingSchedule", {
              courseScheduleId: scheduleId,
              teacherId: teacherId,
              userId: userId,
            });
          }
          
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
        setIsSubmit(false);
      })
      .catch((error) => {
        console.error("Error creating schedule:", error);
        toast.error(error.response?.data?.message || "Failed to create schedule");
        setIsSubmit(false);
      });
  };

  // Set End Time based on Start Time
  const setEndTimeValue = (time) => {
    if (time) {
      const endTimeValue = moment(time).add(1, 'hour').format("LT");
      setEndTime(endTimeValue);
      return endTimeValue;
    }
    return "";
  };

  // Handle Start Time change
  const handleStartTimeChange = (time, setFieldValue) => {
    setStartTime(time);
    setFieldValue("startTime", time);
    const endTimeValue = setEndTimeValue(time);
    setFieldValue("endTime", endTimeValue);
  };

  // Handle Date change
  const handleDateChange = (date, setFieldValue) => {
    setStartDate(date);
    setFieldValue("startDate", date);
    const dayValue = moment(date).format("dddd");
    setWeekly(dayValue);
    setFieldValue("weekly", dayValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col sm={12}>
          <div className="mb-4">
            <h4>{courseName || "Create Course Schedule"}</h4>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              weekly: weekly,
              startTime: startTime,
              endTime: endTime,
              enrollstudent: "",
              timeZone: "America/Chicago",
              startDate: startDate,
              teacherName: teacherNameSelect,
            }}
            validationSchema={Yup.object({
              enrollstudent: Yup.number()
                .typeError("Must be a number")
                .positive("Must be positive number")
                .integer("Must be integer")
                .min(1, "Must be at least 1")
                .required("Maximum Enroll Count Is Required"),
              timeZone: Yup.string().required("Time Zone Is Required"),
              teacherName: Yup.object().required("Teacher Is Required"),
            })}
            onSubmit={(values) => submitForm(values)}
          >
            {(formik) => {
              const { setFieldValue, handleSubmit, handleBlur, isValid, dirty } = formik;
              return (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} sm={6} md={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Start Date</Label>
                        <br />
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleDateChange(date, setFieldValue)}
                          minDate={today}
                          placeholderText="Select Start Date"
                          className="form-control form-styles"
                          dateFormat="MMM dd, yyyy"
                          isClearable
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Weekly On</Label>
                        <FormControl
                          type="text"
                          disabled={true}
                          placeholder="Weekly on"
                          value={weekly}
                          className="form-styles"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Start Time</Label>
                        <br />
                        <DatePicker
                          selected={startTime}
                          onChange={(time) => handleStartTimeChange(time, setFieldValue)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control form-styles"
                          placeholderText="Select Start Time"
                          isClearable
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>End Time</Label>
                        <br />
                        <FormControl
                          disabled={true}
                          className="form-styles"
                          placeholder="End Time"
                          value={endTime}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Maximum Enroll Count</Label>
                        <FormControl
                          type="number"
                          name="enrollstudent"
                          placeholder="Maximum Student Allowed"
                          onChange={(e) => setFieldValue("enrollstudent", e.target.value)}
                          onBlur={handleBlur}
                          className="form-styles"
                          min="1"
                        />
                        <ErrorMessage
                          name="enrollstudent"
                          component="span"
                          className="error text-danger error-message"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Time Zone</Label>
                        <br />
                        <TimezonePicker
                          absolute={true}
                          value="America/Chicago"
                          placeholder="Select timezone..."
                          onChange={(e) => setFieldValue("timeZone", e)}
                        />
                        <ErrorMessage
                          name="timeZone"
                          component="span"
                          className="error text-danger error-message"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="form-row mb-3">
                        <Label notify={true}>Teachers</Label>
                        <Select
                          value={teacherNameSelect}
                          name="teacherName"
                          placeholder="Assign Teachers..."
                          styles={customStyles}
                          onChange={(e) => {
                            if (e) {
                              setFieldValue("teacherName", e);
                              setTeacherNameSelect(e);
                              setTeacherId(e.value);
                            }
                          }}
                          options={teacherList.map((teacher) => ({
                            value: teacher.id,
                            label: ` ${teacher.firstName} ${teacher.middleName || ''} ${teacher.lastName}`,
                            name: ` ${teacher.firstName} ${teacher.middleName || ''} ${teacher.lastName}`,
                          }))}
                        />
                        <ErrorMessage
                          name="teacherName"
                          component="span"
                          className="error text-danger error-message"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end mb-3 mt-5">
                    <div className="d-flex">
                      <Button
                        variant="outlined"
                        className="me-3 px-4 py-2"
                        onClick={() => navigate(-1)}
                        disabled={isSubmit}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        // disabled={!isValid || !dirty || isSubmit}
                        variant="contained"
                      >
                        {isSubmit ? "CREATING..." : "CREATE SCHEDULE"}
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourseSchedule;