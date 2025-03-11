// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import Button from "@material-ui/core/Button";
// import { Divider } from "@material-ui/core";
// import { NavLink } from "react-router-dom";
// import { Formik } from "formik";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import MaterialTable from "material-table";
// import { ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material";
// import Carousel from "react-elastic-carousel";
// import { convertFromRaw } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import Avatar from "react-avatar";
// import { useNavigate } from "react-router-dom";
// import moment from "moment-timezone";

// import "../../CSS/CourseDetail.css";
// import Label from "../../Components/Core/Label";
// import tableIcons from '../Core/TableIcons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";
// import {
//   faHeart as fasfaHeart,
//   faWarning,
// } from "@fortawesome/free-solid-svg-icons";

// const tableTheme = createTheme({
//   overrides: {
//     MuiTableRow: {
//       root: {
//         "&:hover": {
//           cursor: "pointer",
//           backgroundColor: "rgba(224, 224, 224, 1) !important",
//         },
//         "&:nth-child(even)": {
//           backgroundColor: "#f0f5f5",
//         },
//       },
//     },
//   },
//   palette: {
//     primary: {
//       main: "#1d1464 !important",
//     },
//     secondary: {
//       main: "#fff !important",
//     },
//   },
// });

// const breakPoints = [
//   { width: 1, itemsToShow: 1 },
//   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//   { width: 768, itemsToShow: 3, itemsToScroll: 3 },
//   { width: 1200, itemsToShow: 3, itemsToScroll: 3 },
//   { width: 1440, itemsToShow: 5, itemsToScroll: 5 },
// ];

// const CourseDetail = (props) => {
//   const [role, setRole] = useState(localStorage.getItem("role"));
//   const [user, setUser] = useState(localStorage.getItem("userId"));
//   const [aliasName, setAliasName] = useState(props?.match?.params?.id);
//   const [courseData, setCourseData] = useState({
//     category: { name: "Sample Category" },
//     name: "Sample Course",
//     description: "Sample Description",
//     discountAmount: 100,
//     actualAmount: 150,
//     imageUrl: "https://via.placeholder.com/150",
//   });
//   const [lessonDetail, setLessonDetail] = useState([
//     { lessonName: "Lesson 1", description: "Description 1", lessonDiscountAmount: 50, lessonActualAmount: 75, isCheckout: false },
//     { lessonName: "Lesson 2", description: "Description 2", lessonDiscountAmount: 60, lessonActualAmount: 85, isCheckout: true },
//   ]);
//   const [scheduleDetail, setScheduleDetail] = useState([
//     { weeklyOn: "Monday", startDate: "2023-10-01", startTime: "10:00", endTime: "12:00", teacherId: { _id: "1", firstName: "John", lastName: "Doe" } },
//     { weeklyOn: "Wednesday", startDate: "2023-10-03", startTime: "14:00", endTime: "16:00", teacherId: null },
//   ]);
//   const [show, setShow] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [favourite, setFavourite] = useState(false);
//   const [spinner, setSpinner] = useState(false);
//   const [checkoutLesson, setCheckoutLesson] = useState([]);
//   const [checkoutId, setCheckoutId] = useState([]);
//   const [isLessonCheckOut, setIsLessonCheckOut] = useState(false);
//   const [isSchedule, setIsSchedule] = useState(false);
//   const [courseId, setCourseId] = useState("");
//   const [lessonPayment, setLessonPayment] = useState("");
//   const [lessonIds, setLessonIds] = useState([]);
//   const [lessonNumber, setLessonNumber] = useState("");
//   const [showMultiplePay, setShowMultiplePay] = useState(false);
//   const [multiLessonData, setMultiLessonData] = useState([]);
//   const [lessonSchedule, setLessonSchedule] = useState("");
//   const [lessonScheduleId, setLessonScheduleId] = useState("");
//   const [courseCheckout, setCourseCheckout] = useState("");
//   const [studentList, setStudentList] = useState([]);
//   const cDate = Date.now();
//   const [currentDate, setCurrentDate] = useState(
//     moment(cDate).tz("India/Tamilnadu").format("ll")
//   );

//   const ModalClose = () => {
//     setIsLessonCheckOut(false);
//   };

//   const scheduleClose = () => {
//     setIsSchedule(false);
//   };

//   const getMultiLessoncheckout = (list) => {
//     const lessonDetails = list;
//     setMultiLessonData(lessonDetails);
//     let amt = [];
//     lessonDetails.map((value) => {
//       let amount = parseInt(value.lessonDiscountAmount);
//       if (value.isCheckout === false) {
//         amt.push(amount);
//       }
//     });

//     let res = 0;
//     for (let i = 0; i < amt.length; i++) {
//       res += amt[i];
//     }

//     setLessonPayment(res);
//     if (res > 0) {
//       setShowMultiplePay(true);
//     } else {
//       setShowMultiplePay(false);
//     }
//   };

//   const lessonCheckOut = () => {
//     const cDate = Date.now();
//     const currentDate = moment(cDate).tz("America/Chicago").format("ll");

//     let lessonIdsData = [];
//     multiLessonData?.map((list) => {
//       lessonIdsData.push(list);
//     });

//     let lessonId = [];
//     let date = new Date();
//     let lessonScheduledDate = new Date(lessonScheduleId.startDate);
//     if (date < lessonScheduledDate) {
//       navigate(
//         "/course/checkout", {
//         state: {
//           // courseId: courseId,
//           // lessonPayment: lessonPayment,
//           // scheduleId: lessonScheduleId,
//           // lessonIds: lessonIds.length > 0 ? lessonId : lessonIdsData,
//         },
//       });
//     } else {
//       setIsSchedule(true);
//     }
//   };

//   const columns = [
//     {
//       title: "Lesson",
//       width: "5%",
//       render: (rowData) => `Lesson-${rowData.tableData.id + 1}`,
//     },
//     { title: "Lesson Name", field: "lessonName" },
//     {
//       title: "Description",
//       render: (rowData) => (
//         <p
//           className="ellipsis-text-details"
//           dangerouslySetInnerHTML={{ __html: rowData.description }}
//         ></p>
//       ),
//       cellStyle: {
//         maxWidth: 450,
//       },
//     },
//     {
//       title: (
//         <div>
//           <p className="mb-0">Durations</p>
//           <p className="mb-0">(in Hours)</p>
//         </div>
//       ),
//       render: (rowData) => `1 `,
//     },
//     {
//       title: "Price",
//       render: (rowData) => (
//         <div className="d-flex">
//           <p className="mx-2">${rowData.lessonDiscountAmount}</p>
//           <p className="amount-text">${rowData.lessonActualAmount} </p>
//         </div>
//       ),
//     },
//     {
//       title: "Enroll Lesson",
//       render: (rowData) => (
//         <>
//           {role ? (
//             role === "admin" || role === "teacher" ? (
//               <NavLink to="#" className="purchased-course fw-bold">
//                 Checkout
//               </NavLink>
//             ) : rowData.isCheckout === true ? (
//               <NavLink to="#" className="purchased-course fw-bold">
//                 Purchased
//               </NavLink>
//             ) : (
//               <NavLink
//                 className="fw-bold checkout-clr"
//                 to="#"
//                 onClick={() => {
//                   setIsLessonCheckOut(true);
//                   setCourseId(rowData?.courseId);
//                   setLessonPayment(rowData?.lessonDiscountAmount);
//                   setLessonIds(rowData?.id);
//                   setLessonNumber(rowData?.lessonNumber);
//                   setShowMultiplePay(true);
//                 }}
//               >
//                 Checkout
//               </NavLink>
//             )
//           ) : (
//             <NavLink to={"/login"} className="fw-bold checkout-clr">
//               Checkout
//             </NavLink>
//           )}
//         </>
//       ),
//     },
//   ];

//   const studentId = localStorage.getItem("studentId");
//   const parentId = localStorage.getItem("parentId");

//   return (
//     <Container className="py-3">
//       <div>
//         <Row>
//           <Col sm={12} md={9} lg={8}>
//             {role === "parent" &&
//               (studentList.length > 0 ? (
//                 <div className="mt-3">
//                   <label>Select Student :</label>
//                   <Select
//                     placeholder="Select Student"
//                     styles={customStyles}
//                     options={studentList?.map((list) => ({
//                       value: list?.id,
//                       label: `${list?.firstName} ${list?.lastName}`,
//                       isDisabled: !list?.activeStatus,
//                     }))}
//                   />
//                 </div>
//               ) : (
//                 <Row>
//                   <p className="mt-3 text-center">Student Yet to be Created</p>
//                   <Col className="d-flex justify-content-center mt-3">
//                     <Button>
//                       <NavLink to={"/student/signup"}>Create Student</NavLink>
//                     </Button>
//                   </Col>
//                 </Row>
//               ))}
//           </Col>
//         </Row>

//         {courseData ? (
//           <div className="mt-4">
//             <Row>
//               <Col xs={12} sm={9} className="height:auto">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="d-flex">
//                     <h4>{`${courseData?.category?.name} - ${courseData?.name}`}</h4>

//                     {role === "admin" || user === null ? null : favourite ===
//                       true ? (
//                       <FontAwesomeIcon
//                         icon={fasfaHeart}
//                         color="crimson"
//                         className="mb-0 ms-3"
//                         style={{ fontSize: 24, cursor: "pointer" }}
//                         onClick={() => {
//                           setSpinner(true);
//                           setFavourite(!favourite);
//                         }}
//                       />
//                     ) : (
//                       <FontAwesomeIcon
//                         icon={farfaHeart}
//                         color="black"
//                         className="mb-0 ms-3"
//                         style={{ fontSize: 24, cursor: "pointer" }}
//                         onClick={() => {
//                           setSpinner(true);
//                           setFavourite(!favourite);
//                         }}
//                       />
//                     )}
//                   </div>

//                   <div
//                     className="d-flex align-items-center "
//                     style={{ flexWrap: "wrap" }}
//                   >
//                     <h5>Amount : </h5>
//                     <h5 className="discount-amt-txt mb-2 ms-1">
//                       {" "}
//                       ${courseData?.discountAmount}{" "}
//                     </h5>
//                     <h5 className="actual-amt-txt mb-2">
//                       ${courseData?.actualAmount}
//                     </h5>
//                   </div>
//                 </div>

//                 <Divider />
//               </Col>
//               <Col xs={12} sm={9} className="height:auto">
//                 <p
//                   dangerouslySetInnerHTML={{ __html: courseData?.description }}
//                 ></p>
//                 <Divider />
//               </Col>
//               <Col xs={12} sm={3} className="course-image-style">
//                 {courseData?.imageUrl === undefined ||
//                 courseData?.imageUrl === null ? (
//                   <img
//                     className="image-heigh"
//                     src="https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"
//                     alt="Snow"
//                     width={"100%"}
//                     height={"100%"}
//                   />
//                 ) : (
//                   <img
//                     src={courseData?.imageUrl}
//                     className="img-fluid"
//                     alt=""
//                   />
//                 )}
//               </Col>
//             </Row>
//             <Row className="mb-3">
//               <h4 className="row-main">Available Timing (Central Time)</h4>
//               {scheduleDetail?.length > 0 ? (
//                 scheduleDetail?.length < 3 ? (
//                   scheduleDetail.map((scheduleDetail, i) => (
//                     <Col xs={12} sm={6} md={6} lg={4} className="mt-3">
//                       <Card className="shadow available-time pt-2 ">
//                         <Row className="d-flex px-3 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 ">Every</p>
//                           </Col>
//                           <Col className="ms-1 detail-col-tag">
//                             <text className=" detail-page-pTag mb-1 ">
//                               : {scheduleDetail?.weeklyOn}
//                             </text>
//                           </Col>
//                         </Row>
//                         <Row className="d-flex px-3 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 ">Start Date</p>
//                           </Col>
//                           <Col className="ms-1 ">
//                             <p className=" detail-page-pTag mb-1 ">
//                               {" "}
//                               : {scheduleDetail?.startDate}
//                             </p>
//                           </Col>
//                         </Row>
//                         <Row className="d-flex ps-3 pe-2 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 ">Schedule</p>
//                           </Col>
//                           <Col className="ms-1 detail-col-tag ">
//                             <p className=" detail-page-pTag mb-1 ">
//                               :{" "}
//                               {`${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`}
//                             </p>
//                           </Col>
//                         </Row>
//                         <div>
//                           {scheduleDetail?.teacherId?._id ? (
//                             <NavLink
//                               className="row mx-3 mb-2 text-decoration-none hover-zoom"
//                               onClick={() =>
//                                 navigate({
//                                   pathname: `/teacher/profile/view`,
//                                   state: {
//                                     teacherId: scheduleDetail?.teacherId?._id,
//                                   },
//                                 })
//                               }
//                             >
//                               <Col xs={5} className="teachers-profile-image">
//                                 <Avatar
//                                   name={`${scheduleDetail?.teacherId?.firstName} ${scheduleDetail?.teacherId?.lastName}`}
//                                   size="40"
//                                   round={true}
//                                   color="silver"
//                                 />
//                               </Col>
//                               <Col xs={7} className="teacher-detail px-3">
//                                 <span>
//                                   <h5 className="teachers-name mb-0">
//                                     {scheduleDetail?.teacherId?.firstName}{" "}
//                                     {scheduleDetail?.teacherId?.middleName}{" "}
//                                     {scheduleDetail?.teacherId?.lastName}
//                                   </h5>
//                                 </span>
//                               </Col>
//                             </NavLink>
//                           ) : (
//                             <NavLink className="row mx-3 mb-2 text-decoration-none">
//                               <Col xs={4} className="teachers-profile-image">
//                                 <Avatar
//                                   src={
//                                     "https://www.freeiconspng.com/thumbs/warning-icon-png/warning-icon-28.png"
//                                   }
//                                   size="38"
//                                   round={true}
//                                   color="silver"
//                                 />
//                               </Col>
//                               <Col xs={8} className="no-teacher-detail px-3">
//                                 <span>
//                                   <h6 className="teachers-not-name mb-0">
//                                     Teacher Not Updated
//                                   </h6>
//                                   <h6 className="teachers-not-spec">
//                                     {" "}
//                                     Right Now
//                                   </h6>
//                                 </span>
//                               </Col>
//                             </NavLink>
//                           )}
//                         </div>
//                         <Card.Footer className="course-detail-footer">
//                           {scheduleDetail?.teacherId?._id ? (
//                             <div>
//                               {role === "admin" || role === "teacher" ? (
//                                 <NavLink
//                                   className="enroll-Navlink-disable"
//                                   to={"#"}
//                                   onClick={() => {}}
//                                 >
//                                   Enroll
//                                 </NavLink>
//                               ) : studentId === courseCheckout?.studentId ||
//                                 parentId === courseCheckout?.parentId ? (
//                                 <NavLink
//                                   className="enroll-Navlink-disable"
//                                   disabled
//                                 >
//                                   Enroll
//                                 </NavLink>
//                               ) : currentDate > scheduleDetail.startDate ? (
//                                 <NavLink
//                                   className="enroll-Navlink-disable"
//                                   disabled
//                                 >
//                                   Enroll
//                                 </NavLink>
//                               ) : (
//                                 <NavLink
//                                   className="enroll-Navlink"
//                                   to={{
//                                     pathname: `/course/checkout/${courseData?.aliasName}`,
//                                     state: {
//                                       courseId: courseData?.id,
//                                       scheduleId: scheduleDetail?.id,
//                                       scheduleDetail: scheduleDetail,
//                                       coursePayment:
//                                         courseData?.discountAmount,
//                                     },
//                                   }}
//                                   onClick={() => {
//                                     const time = `${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`;
//                                     localStorage.setItem(
//                                       "courseTiming",
//                                       time
//                                     );
//                                   }}
//                                 >
//                                   Enroll
//                                 </NavLink>
//                               )}
//                             </div>
//                           ) : (
//                             <NavLink
//                               className="enroll-Navlink-disable"
//                               to={"#"}
//                               onClick={() => {}}
//                             >
//                               Enroll
//                             </NavLink>
//                           )}
//                         </Card.Footer>
//                       </Card>
//                     </Col>
//                   ))
//                 ) : (
//                   <Carousel breakPoints={breakPoints}>
//                     {scheduleDetail.map((scheduleDetail, i) => (
//                       <Card className="shadow available-time">
//                         <Row className="d-flex px-3 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 fw-bold">Every</p>
//                           </Col>
//                           <Col className="ms-1 detail-col-tag">
//                             <text className=" detail-page-pTag mb-1 ">
//                               : {scheduleDetail?.weeklyOn}
//                             </text>
//                           </Col>
//                         </Row>
//                         <Row className="d-flex px-3 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 fw-bold">
//                               Start Date
//                             </p>
//                           </Col>
//                           <Col className="ms-1 ">
//                             <p className=" detail-page-pTag mb-1 ">
//                               {" "}
//                               : {scheduleDetail?.startDate}
//                             </p>
//                           </Col>
//                         </Row>
//                         <Row className="d-flex ps-3 pe-2 py-1 course-checout-card-width">
//                           <Col className="ms-1 detail-col-tag">
//                             <p className=" form_text1 mb-1 fw-bold">
//                               Schedule
//                             </p>
//                           </Col>
//                           <Col className="ms-1 detail-col-tag ">
//                             <p className=" detail-page-pTag mb-1 ">
//                               :{" "}
//                               {`${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`}
//                             </p>
//                           </Col>
//                         </Row>
//                         {scheduleDetail?.teacherId?._id ? (
//                           <div
//                             className="row teacher-detail-sec mb-2"
//                             onClick={() =>
//                               navigate({
//                                 pathname: `/teacher/profile/view`,
//                                 state: {
//                                   teacherId: scheduleDetail?.teacherId?._id,
//                                 },
//                               })
//                             }
//                           >
//                             <Col xs={5} className="teachers-profile-image">
//                               <Avatar
//                                 name={`${scheduleDetail?.teacherId?.firstName} ${scheduleDetail?.teacherId?.lastName}`}
//                                 size="45"
//                                 round={true}
//                                 color="silver"
//                               />
//                             </Col>
//                             <Col xs={7} className="teacher-detail px-3">
//                               <span>
//                                 <h5 className="teachers-name mb-0">
//                                   {scheduleDetail?.teacherId?.firstName}{" "}
//                                   {scheduleDetail?.teacherId?.middleName}{" "}
//                                   {scheduleDetail?.teacherId?.lastName}
//                                 </h5>
//                               </span>
//                             </Col>
//                           </div>
//                         ) : (
//                           <div className="row mb-2">
//                             <Col xs={4} className="teachers-profile-image">
//                               <Avatar
//                                 src={
//                                   "https://www.freeiconspng.com/thumbs/warning-icon-png/warning-icon-28.png"
//                                 }
//                                 size="38"
//                                 round={true}
//                                 color="silver"
//                               />
//                             </Col>
//                             <Col xs={8} className="no-teacher-detail px-2">
//                               <span>
//                                 <h6 className="teachers-not-name mb-0">
//                                   Teacher Not Updated
//                                 </h6>
//                                 <h6 className="teachers-not-spec">
//                                   {" "}
//                                   Right Now
//                                 </h6>
//                               </span>
//                             </Col>
//                           </div>
//                         )}
//                         <Card.Footer>
//                           {scheduleDetail?.teacherId?._id ? (
//                             <div>
//                               {role === "admin" || role === "teacher" ? (
//                                 <NavLink
//                                   className="enroll-Navlink-disable"
//                                   to={"#"}
//                                   onClick={() => {}}
//                                 >
//                                   Enroll 1
//                                 </NavLink>
//                               ) : (
//                                 <NavLink
//                                   className="enroll-Navlink"
//                                   to={{
//                                     pathname: `/course/checkout/${courseData?.aliasName}`,
//                                     state: {
//                                       courseId: courseData?.id,
//                                       scheduleId: scheduleDetail?.id,
//                                       scheduleDetail: scheduleDetail,
//                                       coursePayment:
//                                         courseData?.discountAmount,
//                                     },
//                                   }}
//                                   onClick={() => {
//                                     const time = `${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`;
//                                     localStorage.setItem(
//                                       "courseTiming",
//                                       time
//                                     );
//                                   }}
//                                 >
//                                   Enroll 2
//                                 </NavLink>
//                               )}
//                             </div>
//                           ) : (
//                             <NavLink
//                               className="enroll-Navlink"
//                               to={"#"}
//                               onClick={() => {
//                                 setShow(true);
//                               }}
//                             >
//                               Enroll 3
//                             </NavLink>
//                           )}
//                         </Card.Footer>
//                       </Card>
//                     ))}
//                   </Carousel>
//                 )
//               ) : (
//                 <div className="d-flex justify-content-center">
//                   <h6>No Scheduled Timing</h6>
//                 </div>
//               )}
//             </Row>
//             <Row className="mt-5">
//               <div className="row-main-lessoncheckout ">
//                 <div>
//                   <h4>Course Lessons</h4>
//                 </div>
//                 <div className="mb-3">
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={!showMultiplePay}
//                     className={`${
//                       !showMultiplePay ? "create-disable" : "create-active"
//                     }`}
//                     onClick={() =>
//                       setIsLessonCheckOut(true)
//                     }
//                   >
//                     Pay Now ${lessonPayment ? lessonPayment : 0}
//                   </Button>
//                   <div></div>
//                 </div>
//               </div>
//               <div className="material-table-responsive mb-3">
//                 <ThemeProvider theme={tableTheme}>
//                   <MaterialTable
//                     icons={tableIcons}
//                     data={lessonDetail}
//                     columns={columns}
//                     onSelectionChange={(lessonDetail) => {
//                       getMultiLessoncheckout(lessonDetail);
//                     }}
//                     localization={{
//                       body: {
//                         emptyDataSourceMessage: "Lessons Not Created",
//                       },
//                     }}
//                     options={{
//                       actionsColumnIndex: -1,
//                       addRowPosition: "last",
//                       headerStyle: {
//                         fontWeight: "bold",
//                         zIndex: 0,
//                         backgroundColor: "#1d1464",
//                         color: "white",
//                       },
//                       showTitle: false,
//                       search: false,
//                       toolbar: false,
//                       selection:
//                         role === "admin" || role === "teacher" ? false : true,
//                       selectionProps: (rowData) =>
//                         rowData.isCheckout === true
//                           ? {
//                               disabled:
//                                 rowData.isCheckout === true
//                                   ? true ||
//                                     currentDate > scheduleDetail.startDate
//                                   : false,
//                               color: "success",
//                               checked:
//                                 rowData.isCheckout === true ? true : false,
//                             }
//                           : { color: "primary" },
//                     }}
//                   />
//                 </ThemeProvider>
//               </div>
//             </Row>
//             {spinner && (
//               <div className="spanner">
//                 <Spinner animation="grow" variant="light" />
//                 <span>
//                   <h4 style={{ paddingLeft: 20 }}>Loading...</h4>
//                 </span>
//               </div>
//             )}
//             <Modal
//               show={isLessonCheckOut}
//               centered
//               onHide={() => {
//                 ModalClose();
//               }}
//             >
//               <Modal.Body id="contained-modal-title-vcenter">
//                 <div className="container py-3 px-3">
//                   <div className="row flex-direction-row">
//                     <h3 className=" d-flex justify-content-center align-self-center ">
//                       Schedule Details
//                     </h3>
//                   </div>
//                   <Formik>
//                     {(formik) => {
//                       const { isValid } = formik;
//                       return (
//                         <div className="mt-0">
//                           <div className="mt-3">
//                             <Row>
//                               <Form className="category-form-style">
//                                 <Form.Group
//                                   className="form-row mb-3"
//                                   style={{ width: "100%" }}
//                                 >
//                                   <Label notify={true}>
//                                     Select Time Slot
//                                   </Label>
//                                   <Select
//                                     className="form-styles align-self-center"
//                                     type="text"
//                                     styles={customStyles}
//                                     placeholder="Select Schedule"
//                                     value={lessonSchedule}
//                                     onChange={(e) => {
//                                       setLessonSchedule(e);
//                                       setLessonScheduleId(e.lessonScheduleId);
//                                       setCourseId(
//                                         e.lessonScheduleId.courseId
//                                       );
//                                     }}
//                                     options={scheduleDetail.map((item) => ({
//                                       label: item.teacherId
//                                         ? item.startDate +
//                                           "-" +
//                                           item.startTime +
//                                           " to " +
//                                           item.endTime +
//                                           " (" +
//                                           item.weeklyOn +
//                                           ")"
//                                         : null,
//                                       value: item.teacherId
//                                         ? item.startDate +
//                                           "-" +
//                                           item.startTime +
//                                           " to " +
//                                           item.endTime +
//                                           " (" +
//                                           item.weeklyOn +
//                                           ")"
//                                         : null,
//                                       lessonScheduleId: item,
//                                     }))}
//                                   />
//                                 </Form.Group>
//                               </Form>
//                             </Row>
//                             <Row className="button-content-style">
//                               <Col xs={6} sm={6} md={6}>
//                                 <Button
//                                   fullWidth
//                                   className="Kharpi-cancel-btn"
//                                   color="default"
//                                   style={{ width: "100%", borderRadius: 5 }}
//                                   onClick={() => {
//                                     setIsLessonCheckOut(false);
//                                     setLessonSchedule("");
//                                   }}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </Col>
//                               <Col xs={6} sm={6} md={6}>
//                                 {role === "admin" || role === "teacher" ? (
//                                   <div></div>
//                                 ) : (
//                                   <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     color="primary"
//                                     className={`${
//                                       !isValid ||
//                                       !showMultiplePay ||
//                                       !lessonSchedule
//                                         ? "create-disable"
//                                         : "create-active"
//                                     }`}
//                                     onClick={() => lessonCheckOut()}
//                                   >
//                                     Pay Now ${lessonPayment}
//                                   </Button>
//                                 )}
//                               </Col>
//                             </Row>
//                           </div>
//                         </div>
//                       );
//                     }}
//                   </Formik>
//                 </div>
//               </Modal.Body>
//             </Modal>
//             <Modal
//               show={isSchedule}
//               centered
//               onHide={() => {
//                 scheduleClose();
//               }}
//             >
//               <Modal.Body className="d-flex justify-content-center">
//                 <FontAwesomeIcon
//                   className="text-center"
//                   size={50}
//                   icon={faWarning}
//                 />
//                 <p>Please select valid schedule</p>
//               </Modal.Body>
//               <Modal.Footer className="d-flex justify-content-center">
//                 <Button onClick={scheduleClose}>OK</Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         ) : null}
//       </div>
//     </Container>
//   );
// };
// export default CourseDetail;