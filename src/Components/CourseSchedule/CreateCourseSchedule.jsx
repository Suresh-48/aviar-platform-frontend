import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import TimezonePicker from "react-bootstrap-timezone-picker";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from 'axios';
import { customStyles } from "../Core/Selector.js";
import Label from "../../Components/Core/Label";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

// Validation
const courseScheduleSchema = Yup.object().shape({
  weekly: Yup.string().required("Day Is Required"),
  enrollstudent: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{0,4}?[ \\-]*[0-9]{0,4}?$/,
      "Enter Valid Count"
    )
    .required("Maximum Enroll Count Is Required"),
  startTime: Yup.string().required("Start Time Is Required"),
  endTime: Yup.string().required("End Time Is Required"),
  timeZone: Yup.string().required("Time Zone Is Required"),
  startDate: Yup.string().required("Course Start Date Is Required"),
  teacherName: Yup.object().required("Teacher Is Required"),
});

const options = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const CreateCourseSchedule = (props) => {
  const [startTime, setStartTime] = useState(dayjs()); // Initialize with current time
  const [endTime, setEndTime] = useState("");
  const [courseName, setCourseName] = useState(props?.location?.state?.courseName);
  const [courseId, setCourseId] = useState(props?.location?.state?.courseId);
  const [weekly, setWeekly] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [duration, setDuration] = useState(60); // Default duration in minutes
  const [startDate, setStartDate] = useState(dayjs()); // Initialize with current date
  const [isLoading, setIsLoading] = useState(true);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherNameSelect, setTeacherNameSelect] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [lessonLength, setLessonLength] = useState([]);
  const [enrollstudent, setEnrollStudent] = useState("");
  const [today, setToday] = useState(dayjs()); // Initialize with current date

  useEffect(() => {
    // getCourseData();
    // getApprovedTeacher();
    // getLessonData();
  }, []);
   
  
  const submitForm = (values, { setFieldValue }) => {
    const userId = localStorage.getItem("userId");
    axios.post("http://localhost:3000/api/v1/courseSchedule/createSchedule",{
      courseId:courseId,
      weekly: weekly,
      startTime: startTime,
      endTime: endTime,
      enrollstudent: enrollstudent,
      timeZone: "India/Tamilnadu",
      startDate: startDate, 
      teacherName: teacherNameSelect,
      userId:userId,

    })
    // .then((res)=>{console.log("res",res.data)})

    const formattedDate = dayjs(values.startDate).format("LLLL"); // Full date & time
    const dayOfWeek = dayjs(values.startDate).format("dddd"); // Weekday name

    setStartDate(formattedDate);
    setWeekly(dayOfWeek);
    setFieldValue("weekly", dayOfWeek);
    console.log("values...",values)
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Row className="mt-3">
            <Col sm={12}>
              <div className="mb-4">
                <h4>{courseName}</h4>
                <br/>
              </div>
              {/* <h5 className="mb-3 text-center">Course schedule create</h5> */}
              <Formik
                enableReinitialize
                initialValues={{
                  weekly: weekly,
                  startTime: startTime,
                  // endTime: endTime,
                  enrollstudent: enrollstudent,
                  timeZone: "India/Tamilnadu",
                  startDate: startDate,
                  teacherName: teacherNameSelect,
                }}
                validationSchema={courseScheduleSchema}
                onSubmit={(values, { setFieldValue }) => submitForm(values, { setFieldValue })}
              >
                {(formik) => {
                  const { values, setFieldValue, handleChange, handleSubmit, handleBlur, isValid } = formik;
                  return (
                    <div>
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} sm={6} md={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Start Date</Label>
                              <br />
                              <DatePicker
                                variant="standard"
                                className="start-time-style"
                                style={{ paddingLeft: 10 }}
                                minDate={today}
                                placeholder="Select Start Date"
                                helperText={""}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                format="MMM dd yyyy"
                                value={values.startDate ? dayjs(values.startDate) : dayjs()} // Ensure valid dayjs object
                                onChange={(e) => {
                                  if (e && e.isValid()) {
                                    setFieldValue("startDate", e);
                                    setStartDate(e);
                                  }
                                }}
                                keyboardIcon={
                                  <FontAwesomeIcon
                                    icon={faCalendarDay}
                                    size="sm"
                                    color="grey"
                                    style={{ padding: 0 }}
                                  />
                                }
                              />
                              <ErrorMessage
                                name="startDate"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col xs={12} sm={6} md={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Weekly On</Label>
                              <FormControl
                                type="text"
                                id="weekly"
                                disabled={true}
                                placeholder="weekly on"
                                value={weekly}
                                onChange={(e) => {
                                  setFieldValue("weekly", e.target.value);
                                }}
                                className="form-styles"
                              />
                              <ErrorMessage
                                name="weekly"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col> */}
                        </Row>

                        <Row>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Start Time</Label>
                              <br />
                              <TimePicker
                                variant="standard"
                                className="start-time-style"
                                style={{ paddingLeft: 10 }}
                                placeholder="Select Start Time"
                                helperText={""}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                value={values.startTime ? dayjs(values.startTime) : dayjs()} // Ensure valid dayjs object
                                name="startTime"
                                onChange={(e) => {
                                  if (e && e.isValid()) {
                                    setFieldValue("startTime", e);
                                    setStartTime(e);
                                    // Calculate endTime based on startTime and duration
                                    const endTime = dayjs(e).add(duration, 'minutes').format("hh:mm A");
                                    setEndTime(endTime);
                                    setFieldValue("endTime", endTime);
                                  }
                                }}
                                keyboardIcon={
                                  <FontAwesomeIcon icon={faClock} size="sm" color="grey" style={{ padding: 0 }} />
                                }
                              />
                              <ErrorMessage
                                name="startTime"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>End Time</Label>
                              <br />
                              <FormControl
                                variant="standard"
                                disabled={true}
                                className="start-time-style"
                                style={{
                                  paddingLeft: 10,
                                  backgroundColor: "white",
                                }}
                                placeholder="Select End Time"
                                helperText={""}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                value={endTime}
                                keyboardIcon={
                                  <FontAwesomeIcon icon={faClock} size="sm" color="grey" style={{ padding: 0 }} />
                                }
                              />
                              <ErrorMessage
                                name="endTime"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col xs={12} sm={6}>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Maximum Enroll Count</Label>
                              <FormControl
                                type="type"
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
                                value={values.timeZone}
                                placeholder="Select timezone..."
                                onChange={(e) => setFieldValue("timeZone", e)}
                                disabled
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
                          {/* <Col>
                            <Form.Group className="form-row mb-3">
                              <Label notify={true}>Teachers</Label>
                              <Select
                                value={teacherNameSelect}
                                name="teacherName"
                                placeholder="Assign Teachers..."
                                styles={customStyles}
                                onChange={(e) => {
                                  if (e.label === "None") {
                                    setFieldValue("teacherName", null);
                                    setTeacherId(null);
                                  } else {
                                    setFieldValue("teacherName", e.name);
                                    setTeacherName(e.name);
                                    setTeacherId(e.value);
                                    setSpeciality(e.speciality);
                                    setTeacherNameSelect(e);
                                  }
                                }}
                                options={[
                                  { value: null, label: "None" },
                                  {
                                    options: teacherList.map((list) => ({
                                      value: list.id,
                                      label: (
                                        <div>
                                          <div className="d-flex justify-content-start align-items-center">
                                            <Avatar src={list.imageUrl} alt="" round={true} />
                                            <div className="dropdown-names">
                                              {`${list.firstName} ${list.middleName} ${list.lastName}`}
                                            </div>
                                          </div>
                                        </div>
                                      ),
                                      name: `${list.firstName} ${list.middleName} ${list.lastName}`,
                                      speciality: `${list.speciality}`,
                                    })),
                                  },
                                ]}
                              />
                              <ErrorMessage
                                name="teacherName"
                                component="span"
                                className="error text-danger error-message"
                              />
                            </Form.Group>
                          </Col> */}
                        </Row>
                        <div style={{ display: "flex", justifyContent: "flex-end" }} className="mb-3 mt-5">
                          <div className="d-flex">
                            <Button
                              className="Kharpi-cancel-btn me-3 px-4 py-3"
                              // onClick={() => props.history.goBack()}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              // disabled={!isValid}
                              variant="contained"
                              // className={`${!isValid ? "create-disable" : "create-active"}`}
                            >
                              CREATE SCHEDULE
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
      </LocalizationProvider>
    </div>
  );
};

export default CreateCourseSchedule;