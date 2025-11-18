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

// Alternative date pickers - using react-datepicker which you have in package.json
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Api
import Api from "../../Api.jsx";

// Component
import Label from "../../components/core/Label";
import Loader from "../core/Loader.jsx";

// Styles
import "../../css/CreateCourseSchedule.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { customStyles } from "../core/Selector.js";

// Validation
const courseScheduleSchema = Yup.object().shape({
  weekly: Yup.string().required("Day Is Required"),
  enrollstudent: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .min(1, "Must be at least 1")
    .required("Maximum Enroll Count Is Required"),
  startTime: Yup.mixed().required("Start Time Is Required"),
  endTime: Yup.string().required("End Time Is Required"),
  timeZone: Yup.string().required("Time Zone Is Required"),
  startDate: Yup.mixed().required("Course Start Date Is Required"),
  teacherName: Yup.object().required("Teacher Is Required"),
});

const EditCourseSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [courseName, setCourseName] = useState(location?.state?.courseId?.name);
  const [courseScheduleId, setCourseScheduleId] = useState(location?.state?.id);
  const [details, setDetails] = useState({});
  const [timeZone, setTimeZone] = useState("America/Chicago");
  const [weekly, setWeekly] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherNameSelect, setTeacherNameSelect] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [enrollstudent, setEnrollStudent] = useState("");
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    console.log("Location state:", location.state);
    if (courseScheduleId) {
      getCourseScheduleData();
      getApprovedTeacher();
    } else {
      setIsLoading(false);
      toast.error("Course Schedule ID not found");
    }
  }, [courseScheduleId]);

  // Log out
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Get course schedule data
  const getCourseScheduleData = () => {
    const userId = localStorage.getItem("userId");
    console.log("Getting course schedule data for:", courseScheduleId);
    
    Api.get(`/api/v1/courseSchedule/get/schedule`, {
      params: {
        courseScheduleId: courseScheduleId,
        userId: userId,
      },
    })
      .then((res) => {
        console.log("Course schedule data response:", res.data);
        const data = res.data.scheduleOne;
        setDetails(data);
        
        // Format dates for date pickers
        if (data.startDate) {
          const startDateObj = moment(data.startDate).toDate();
          setStartDate(startDateObj);
        }
        
        if (data.startTime) {
          const startTimeObj = moment(data.startTime, "hh:mm A").toDate();
          setStartTime(startTimeObj);
        }
        
        if (data.endTime) {
          setEndTime(data.endTime);
        }
        
        setTimeZone(data.timeZone || "America/Chicago");
        setWeekly(data.weeklyOn || "");
        setEnrollStudent(data.totalStudentEnrolled || "");
        
        // Set teacher data if available
        if (data?.teacherId) {
          const teacherOption = {
            value: data.teacherId._id,
            label: ` ${data.teacherId.firstName} ${data.teacherId.middleName || ''} ${data.teacherId.lastName}`,
            name: ` ${data.teacherId.firstName} ${data.teacherId.middleName || ''} ${data.teacherId.lastName}`,
          };
          setTeacherNameSelect(teacherOption);
          setTeacherId(data.teacherId._id);
        }
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course schedule data:", error);
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          toast.error("Failed to fetch course schedule details");
        }
        setIsLoading(false);
      });
  };

  // Get Approved Teachers
  const getApprovedTeacher = () => {
    const userId = localStorage.getItem("userId");
    console.log("Getting teacher list...");
    
    Api.get("/api/v1/teacher/list", {
      headers: { userId: userId }
    })
    .then((res) => {
      console.log("Teacher list response:", res.data);
      const data = res.data.teacherList || [];
      setTeacherList(data);
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
      toast.error("Failed to fetch teachers list");
    });
  };

  // Check teacher schedule
  const checkTeacherSchedule = (e) => {
    if (!startTime || !startDate) {
      toast.warning("Please select start date and time first");
      return;
    }

    const teacherId = e.value;
    const startTimeValue = moment(startTime).format("LT");
    const dateValue = moment(startDate).format("YYYY-MM-DD");
    const userId = localStorage.getItem("userId");

    console.log("Checking teacher schedule:", { teacherId, startTimeValue, dateValue });

    Api.get("/api/v1/courseSchedule/check/teacherSchedule", {
      params: {
        teacherId: teacherId,
        startDate: dateValue,
        startTime: startTimeValue,
        userId: userId,
      },
    })
      .then((response) => {
        console.log("Teacher schedule check response:", response.data);
        const status = response.status;
        if (status === 208) {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error checking teacher schedule:", error);
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
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

    console.log("Updating schedule with data:", {
      courseScheduleId,
      weekly,
      startTimeValue,
      timeZone: values.timeZone,
      endTime,
      enrollstudent: values.enrollstudent,
      dateValue,
      teacherName: teacherNameSelect?.name,
      teacherId,
      userId
    });

    // Update schedule data object
    const scheduleData = {
      courseId: details.courseId,
      weeklyOn: weekly,
      startTime: startTimeValue,
      endTime: endTime,
      totalStudentEnrolled: parseInt(values.enrollstudent),
      startDate: dateValue,
      teacherName: teacherNameSelect?.name,
      teacherId: teacherId,
      userId: userId,
    };

    console.log("Sending schedule update data:", scheduleData);

    Api.patch(`/api/v1/courseSchedule/${courseScheduleId}`, scheduleData)
      .then((response) => {
        console.log("Schedule update response:", response.data);
        const status = response.status;
        if (status === 201 || status === 200) {
          // Update teacher upcoming schedule if teacher changed
          if (teacherId) {
            return Api.post("/api/v1/teacherUpcomingSchedule", {
              courseScheduleId: courseScheduleId,
              teacherId: teacherId,
              userId: userId,
            });
          } else {
            return Promise.resolve({ status: 200 });
          }
        } else {
          throw new Error(response.data.message || "Failed to update schedule");
        }
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          toast.success("Schedule updated successfully");
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
        setIsSubmit(false);
      })
      .catch((error) => {
        console.error("Error updating schedule:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Failed to update schedule");
        } else {
          toast.error("Failed to update schedule. Please try again.");
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
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
            <h4>{courseName || "Edit Course Schedule"}</h4>
          </div>
          <h5 className="mb-3 text-center">Edit Course Schedule</h5>

          <Formik
            enableReinitialize
            initialValues={{
              weekly: weekly,
              startTime: startTime,
              endTime: endTime,
              enrollstudent: enrollstudent,
              timeZone: timeZone,
              startDate: startDate,
              teacherName: teacherNameSelect,
            }}
            validationSchema={courseScheduleSchema}
            onSubmit={(values) => submitForm(values)}
          >
            {(formik) => {
              const { values, setFieldValue, handleChange, handleSubmit, handleBlur, isValid, dirty } = formik;
              return (
                <div>
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
                          <ErrorMessage
                            name="startDate"
                            component="span"
                            className="error text-danger error-message"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6} md={6}>
                        <Form.Group className="form-row mb-3">
                          <Label notify={true}>Weekly On</Label>
                          <FormControl
                            type="text"
                            id="weekly"
                            disabled={true}
                            placeholder="Weekly on"
                            value={weekly}
                            className="form-styles"
                          />
                          <ErrorMessage
                            name="weekly"
                            component="span"
                            className="error text-danger error-message"
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
                          <ErrorMessage
                            name="startTime"
                            component="span"
                            className="error text-danger error-message"
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
                          <ErrorMessage
                            name="endTime"
                            component="span"
                            className="error text-danger error-message"
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
                            id="enrollstudent"
                            placeholder="Maximum Student Allowed"
                            value={enrollstudent}
                            onChange={(e) => {
                              setFieldValue("enrollstudent", e.target.value);
                              setEnrollStudent(e.target.value);
                            }}
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
                            value={timeZone}
                            placeholder="Select timezone..."
                            onChange={(e) => {
                              setFieldValue("timeZone", e);
                              setTimeZone(e);
                            }}
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
                              if (e && e.value === null) {
                                setFieldValue("teacherName", null);
                                setTeacherNameSelect(null);
                                setTeacherId(null);
                              } else if (e) {
                                setFieldValue("teacherName", e);
                                setTeacherNameSelect(e);
                                setTeacherId(e.value);
                                checkTeacherSchedule(e);
                              }
                            }}
                            options={[
                              { value: null, label: "None" },
                              ...teacherList.map((list) => ({
                                value: list.id,
                                label: ` ${list.firstName} ${list.middleName || ''} ${list.lastName}`,
                                name: ` ${list.firstName} ${list.middleName || ''} ${list.lastName}`,
                                speciality: list.speciality || "",
                              }))
                            ]}
                          />
                          <ErrorMessage
                            name="teacherName"
                            component="span"
                            className="error text-danger error-message"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div style={{ display: "flex", justifyContent: "flex-end" }} className="mb-3 mt-5">
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
                          disabled={!isValid || !dirty || isSubmit}
                          variant="contained"
                          className={!isValid || !dirty || isSubmit ? "save-changes-disable" : "save-changes-active"}
                        >
                          {isSubmit ? "SAVING..." : "SAVE CHANGES"}
                        </Button>
                      </div>
                    </div>
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

export default EditCourseSchedule;