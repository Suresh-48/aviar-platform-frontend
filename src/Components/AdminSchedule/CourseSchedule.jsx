// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, FormControl, Form } from "react-bootstrap";
// import { Formik, ErrorMessage } from "formik";
// import Button from "@material-ui/core/Button";
// import moment from "moment";
// import Select from "react-select";
// import TimezonePicker from "react-bootstrap-timezone-picker";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// // import {
// //   KeyboardTimePicker,
// //   MuiPickersUtilsProvider,
// //   KeyboardDatePicker,
// // L DesktopDatePicker 
// // } from '@mui/x-date-pickers';
// import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import TextField from '@mui/material/TextField';
// import DateFnsUtils from "@date-io/date-fns";
// import Label from "../../Components/core/Label";
// // Styles
// import "../../CSS/CreateCourseSchedule.css";

// // Icon
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
// import { Avatar } from "@material-ui/core";
// import { customStyles } from "../core/Selector.js";

// // Validation
// const courseScheduleSchema = Yup.object().shape({
//   weekly: Yup.string().required("Day Is Required"),
//   enrollstudent: Yup.string()
//     .matches(
//       /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{0,4}?[ \\-]*[0-9]{0,4}?$/,
//       "Enter Valid Count"
//     )
//     .required("Maximum Enroll Count Is Required"),
//   startTime: Yup.string().required("Start Time Is Required"),
//   endTime: Yup.string().required("End Time Is Required"),
//   timeZone: Yup.string().required("Time Zone Is Required"),
// });

// const EditCourseSchedule = (props) => {
//   const [startTime, setStartTime] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [courseName, setCourseName] = useState(props?.location?.state?.courseId?.name);
//   const [courseScheduleId, setCourseScheduleId] = useState(props?.location?.state?.id);
//   const [details, setDetails] = useState([]);
//   const [timeZone, setTimeZone] = useState("");
//   const [weekly, setWeekly] = useState("");
//   const [weeklyId, setWeeklyId] = useState("");
//   const [isSubmit, setIsSubmit] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [teacherList, setTeacherList] = useState([]);
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherId, setTeacherId] = useState(null);
//   const [teacherNameValue, setTeacherNameValue] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (newDate) => {
//     setSelectedDate(newDate);
//   };

//   useEffect(() => {
//     // getCourseScheduleData();
//     // getApprovedTeacher();
//   }, []);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div>
//         <Container className="edit-course-lesson-style">
//           <Row>
//             <Col lg={12} md={12} sm={12}>
//               <div className="mt-2 mb-4">
//                 <h4>{courseName}</h4>
//               </div>
//               <h5 className="text-center mb-3">Course schedule edit</h5>
//               <Formik
//                 enableReinitialize={true}
//                 initialValues={{
//                   startDate: startDate,
//                   weekly: weekly,
//                   startTime: startTime,
//                   endTime: details.endTime,
//                   timeZone: "America/Chicago",
//                   enrollstudent: details.totalStudentEnrolled,
//                   zoomLink: details.zoomId,
//                   zoomPassword: details.zoomPassword,
//                   teacherName: teacherName !== "" ? teacherName : "",
//                 }}
//                 validationSchema={courseScheduleSchema}
//                 onSubmit={(values) => submitForm(values)}
//               >
//                 {(formik) => {
//                   const {
//                     values,
//                     handleChange,
//                     handleSubmit,
//                     setFieldValue,
//                     handleBlur,
//                     isValid,
//                   } = formik;
//                   return (
//                     <div>
//                       <Form onSubmit={handleSubmit}>
//                         <Row>
//                           <Col xs={12} sm={6} md={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>Start Date</Label>
//                               <br />
//                               <KeyboardDatePicker
//                                 variant="standard"
//                                 className="start-time-style"
//                                 style={{ paddingLeft: 10 }}
//                                 placeholder="Select Start Date"
//                                 helperText={""}
//                                 InputProps={{
//                                   disableUnderline: true,
//                                 }}
//                                 format="MMM dd yyyy"
//                                 value={values.startDate}
//                                 minDate={new Date()}
//                                 onChange={(e) => {
//                                   setFieldValue("startDate", e);
//                                   handleDateChange(e, setFieldValue);
//                                 }}
//                                 keyboardIcon={
//                                   <FontAwesomeIcon
//                                     icon={faCalendar}
//                                     size="sm"
//                                     color="grey"
//                                     style={{ padding: 0 }}
//                                   />
//                                 }
//                               />
//                               <ErrorMessage
//                                 name="startDate"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col xs={12} sm={6} md={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>Weekly On</Label>
//                               <FormControl
//                                 type="text"
//                                 id="weekly"
//                                 placeholder="weekly on"
//                                 value={weekly}
//                                 onChange={(e) => {
//                                   setFieldValue("weekly", e);
//                                 }}
//                                 className="form-styles"
//                               />
//                               <ErrorMessage
//                                 name="weekly"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col xs={12} sm={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>Start Time</Label>
//                               <br />
//                               <KeyboardTimePicker
//                                 variant="standard"
//                                 className="start-time-style"
//                                 style={{ paddingLeft: 10 }}
//                                 placeholder="Select Start Time"
//                                 helperText={""}
//                                 InputProps={{
//                                   disableUnderline: true,
//                                 }}
//                                 value={values.startTime}
//                                 onChange={(e) => {
//                                   setFieldValue("startTime", e);
//                                   handleEndTimeChange(e, { setFieldValue });
//                                 }}
//                                 keyboardIcon={
//                                   <FontAwesomeIcon
//                                     icon={faClock}
//                                     size="sm"
//                                     color="grey"
//                                     style={{ padding: 0 }}
//                                   />
//                                 }
//                               />
//                               <ErrorMessage
//                                 name="startTime"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col xs={12} sm={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>End Time</Label>
//                               <br />
//                               <DesktopDatePicker
//                                 variant="standard"
//                                 className="start-time-style"
//                                 style={{ paddingLeft: 10 }}
//                                 placeholder="Select End Time"
//                                 helperText={""}
//                                 InputProps={{
//                                   disableUnderline: true,
//                                 }}
//                                 value={values.endTime}
//                                 onChange={(e) => {
//                                   setFieldValue("endTime", e);
//                                 }}
//                                 keyboardIcon={
//                                   <FontAwesomeIcon
//                                     icon={faClock}
//                                     size="sm"
//                                     color="grey"
//                                     style={{ padding: 0 }}
//                                   />
//                                 }
//                               />
//                               <ErrorMessage
//                                 name="endTime"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col xs={12} sm={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>Maximum Enroll Count</Label>
//                               <FormControl
//                                 type="type"
//                                 name="enrollstudent"
//                                 id="enrollstudent"
//                                 placeholder="Maximum Student Allowed"
//                                 value={values.enrollstudent}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className="form-styles"
//                               />
//                               <ErrorMessage
//                                 name="enrollstudent"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col xs={12} sm={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label notify={true}>Time Zone</Label>
//                               <br />
//                               <TimezonePicker
//                                 absolute={true}
//                                 value={values.timeZone}
//                                 placeholder="Select timezone..."
//                                 onChange={(e) => setFieldValue("timeZone", e)}
//                                 disabled
//                               />
//                               <ErrorMessage
//                                 name="timeZone"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col xs={12} sm={6} md={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label>Zoom Link</Label>
//                               <FormControl
//                                 type="type"
//                                 name="zoomLink"
//                                 placeholder="Zoom Link"
//                                 value={values.zoomLink}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className="form-styles"
//                               />
//                               <ErrorMessage
//                                 name="zoomLink"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                           <Col xs={12} sm={6} md={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label>Zoom Password</Label>
//                               <FormControl
//                                 type="type"
//                                 name="zoomPassword"
//                                 placeholder="Zoom Password"
//                                 value={values.zoomPassword}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 className="form-styles"
//                               />
//                               <ErrorMessage
//                                 name="zoomPassword"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col xs={12} sm={6} md={6}>
//                             <Form.Group className="form-row mb-3">
//                               <Label>Teachers</Label>
//                               <Select
//                                 value={values.teacherName}
//                                 styles={customStyles}
//                                 placeholder="Assign Teachers..."
//                                 onChange={(e) => {
//                                   if (e.label === "None") {
//                                     setFieldValue("teacherName", null);
//                                     setTeacherId(null);
//                                   } else {
//                                     setFieldValue("teacherName", e);
//                                     setTeacherName(e);
//                                     setTeacherNameValue(e.name);
//                                     setTeacherId(e.value);
//                                   }
//                                 }}
//                                 options={[
//                                   { value: null, label: "None" },
//                                   ...teacherList.map((list) => ({
//                                     value: list.id,
//                                     label: (
//                                       <div>
//                                         {list.imageUrl ? (
//                                           <div className="d-flex justify-content-start align-items-center">
//                                             <Avatar src={list.imageUrl} alt="" round={true} />
//                                             <div className="dropdown-names">
//                                               {`${
//                                                 list.firstName +
//                                                 " " +
//                                                 list.middleName +
//                                                 " " +
//                                                 list.lastName
//                                               }`}
//                                             </div>
//                                           </div>
//                                         ) : (
//                                           <div className="d-flex justify-content-start align-items-center">
//                                             <Avatar round size="38" className="d-flex justify-content-center">
//                                               <p className="dropdown-option mb-0">
//                                                 {list?.firstName.substring(0, 1)}
//                                                 {list.middleName
//                                                   ? list?.middleName.substring(0, 1)
//                                                   : list?.lastName.substring(0, 1)}
//                                               </p>
//                                             </Avatar>
//                                             <div className="dropdown-names">
//                                               {`${
//                                                 list.firstName +
//                                                 " " +
//                                                 list.middleName +
//                                                 " " +
//                                                 list.lastName
//                                               }`}
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     ),
//                                     name: `${list.firstName} ${list.middleName} ${list.lastName}`,
//                                   })),
//                                 ]}
//                               />
//                               <ErrorMessage
//                                 name="teacherName"
//                                 component="span"
//                                 className="error text-danger error-message"
//                               />
//                             </Form.Group>
//                           </Col>
//                         </Row>
//                         <div className="d-flex justify-content-end my-3">
//                           <Button className="Kharpi-cancel-btn me-3 px-3">
//                             Cancel
//                           </Button>
//                           <Button
//                             type="submit"
//                             disabled={!isValid || isSubmit}
//                             variant="contained">
                        
//                               SAVE CHANGES
//                             </Button>
//                           </div>
//                         </Form>
//                       </div>
//                     );
//                   }}
//                 </Formik>
//               </Col>
//             </Row>
//           </Container>
//         {/* )} */}
//       </div>
//       </LocalizationProvider>
//   );
// };

// export default EditCourseSchedule;
