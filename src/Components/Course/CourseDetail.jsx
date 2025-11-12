// import React from "react";
// import { Button, Divider, createTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import Api from "../../Api";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import "../CSS/CourseDetail.css";
import Button from "@material-ui/core/Button";
const CourseDetail = () => {
    const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [aliasName, setAliasName] = useState("nggu");
  const [courseData, setCourseData] = useState("");
  const [lessonDetail, setLessonDetail] = useState([]);
  const [scheduleDetail, setScheduleDetail] = useState("");
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
   const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [checkoutLesson, setCheckoutLesson] = useState([]);
  const [checkoutId, setCheckoutId] = useState([]);
  const [isLessonCheckOut, setIsLessonCheckOut] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [lessonPayment, setLessonPayment] = useState("");
  const [lessonIds, setLessonIds] = useState([]);
  const [lessonNumber, setLessonNumber] = useState("");
  const [showMultiplePay, setShowMultiplePay] = useState(false);
  const [multiLessonData, setMultiLessonData] = useState([]);
  const [lessonSchedule, setLessonSchedule] = useState("");
  const [lessonScheduleId, setLessonScheduleId] = useState("");
  const [courseCheckout, setCourseCheckout] = useState("")
  const navigate = useNavigate();
      const userId = localStorage.getItem("userId");
    const studentId = localStorage.getItem("studentId");
  const defaultMaterialTheme = createTheme();
  const tableTheme = createTheme({
    overrides: {
      MuiTableRow: {
        root: {
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(224, 224, 224, 1) !important",
          },
        },
      },
    },
  });
  
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "student") {
      getCourseDetails();
    } else {
     getCourseLessonDetail();
    }

    window.scrollTo(0, 0);
  }, []);
useEffect(() => {
    getCourseDetails();
    getCourseDetail()
       getCourseLessonDetail();
    getAdminCourseDetails();
  }, []);

    const getCourseDetails = (values) => {
      console.log("getting course details");
    const token = localStorage.getItem("token");
    const cDate = Date.now();
    // const currentDate = moment(cDate).tz("America/Chicago").format("ll");
    // setCurrentDate(currentDate);
    // setToken(token);


    const role = localStorage.getItem("role");
    Api.get(`/api/v1/course/detail/${aliasName}`, {
      params: {
        userId: userId,
        //  studentId: studentId,
      
        role: role,
      },
    })
      
   
      .then((response) => {
          console.log("studentId",studentId)
        console.log("course detail response", response);
        // const data = response.data.data;
        // setFavourite(data.favourite);
        // setCourseData(data.courseDetail);
        // setLessonDetail(data.lessonDetail);
        // setScheduleDetail(data.scheduleDetail);
        // setCheckoutLesson(data.lessondata);
        // setCheckoutId(data.checkoutLesson);
        // setCourseCheckout(data.courseCheckout);
        // setIsLoading(false);
        // setSpinner(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };
    const getCourseDetail = () => {
       Api.get(`api/v1/course/${courseId}`, {
          headers: { userId: userId },
        })
        .then((response) => {
          console.log("response",response)
        setLessonDetail(response); // Update state with the fetched data
        })
        // .catch((error) => {
        //   console.error("Error fetching course detail:", error);
        //   toast.error("Failed to fetch course details"); // Show error message
        // });
    };
    const getCourseLessonDetail =()=>{
    
        Api.get("api/v1/courseLesson/lessonlist",{params: {courseId:courseId, userId:userId}})
      .then((response)=>{
        console.log("response123",response);
     
        const lessonList = response.data.lessonList;
        data.sort((a, b) => (a.lessonNumber > b.lessonNumber ? 1 : -1));
        setData(lessonList);
     
      })
  
      }
    const getAdminCourseDetails = () => {
      console.log("getting admin course details");
    const userId = localStorage.getItem("userId");
    Api.get(`/api/v1/course/detail/admin/${aliasName}`, {
      params: {
        userId: userId,
      },
    }).then((res) => {
      console.log("admin course detail response", res);
      const data = res.data.data;
      // setCourseData(data.courseDetail);
      // setLessonDetail(data.lessonDetail);
      // setScheduleDetail(data.scheduleDetail);
      // setIsLoading(false);
      // setSpinner(false);
    });
  };

  const columns = [
    {
      title: "Lesson",
      width: "5%",
      //   render: (rowData) => `Lesson-${rowData.tableData.id + 1}`,
    },
    { title: "Lesson Name", field: "lessonName" },
    {
      title: "Description",
      //   render: (rowData) => (
      //     <p
      //       className="ellipsis-text-details"
      //       dangerouslySetInnerHTML={convertFromJSONToHTML(
      //         `${rowData.description}`
      //       )}
      //     ></p>
      //   ),
      cellStyle: {
        maxWidth: 450,
      },
    },
    {
      title: (
        <div>
          <p className="mb-0">Durations</p>
          <p className="mb-0">(in Hours)</p>
        </div>
      ),
      //   render: (rowData) => `1 `,
    },
    {
      title: "Price",
      //   render: (rowData) => (
      //     <div className="d-flex">
      //       <p className="mx-2">${rowData.lessonDiscountAmount}</p>
      //       <p className="amount-text">${rowData.lessonActualAmount} </p>
      //     </div>
      //   ),
    },
    {
      title: "Enroll Lesson",
      //   render: (rowData) => (
      //     <>
      //       {role ? (
      //         role === "admin" || role === "teacher" ? (
      //           <NavLink to="#" className="purchased-course fw-bold">
      //             Checkout
      //           </NavLink>
      //         ) : rowData.isCheckout === true ? (
      //           <NavLink to="#" className="purchased-course fw-bold">
      //             Purchased
      //           </NavLink>
      //         ) : (
      //           <NavLink
      //             className="fw-bold checkout-clr"
      //             to="#"
      //             onClick={() => {
      //               setIsLessonCheckOut(true);
      //               setCourseId(rowData?.courseId);
      //               setLessonPayment(rowData?.lessonDiscountAmount);
      //               setLessonIds(rowData?.id);
      //               setLessonNumber(rowData?.lessonNumber);
      //               setShowMultiplePay(true);
      //             }}
      //           >
      //             Checkout
      //           </NavLink>
      //         )
      //       ) : (
      //         <NavLink to={"/login"} className="fw-bold checkout-clr">
      //           Checkout
      //         </NavLink>
      //       )}
      //     </>
      //   ),
    },
  ];

  return (

    <div style={{ maxWidth: "100%", padding: "20px" }}>

      <Row className="mb-3">
        <h4 className="row-main text-center">Available Timing (Central Time)</h4>
        {/* {scheduleDetail?.length > 0 ? (
                  scheduleDetail?.length < 3 ? (
                    scheduleDetail.map((scheduleDetail, i) => (
                      <Col xs={12} sm={6} md={6} lg={4} className="mt-3">
                        <Card className="shadow available-time pt-2 ">
                          <Row className="d-flex px-3 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 ">Every</p>
                            </Col>
                            <Col className="ms-1 detail-col-tag">
                              <text className=" detail-page-pTag mb-1 ">
                                : {scheduleDetail?.weeklyOn}
                              </text>
                            </Col>
                          </Row>
                          <Row className="d-flex px-3 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 ">Start Date</p>
                            </Col>
                            <Col className="ms-1 ">
                              <p className=" detail-page-pTag mb-1 ">
                                {" "}
                                : {scheduleDetail?.startDate}
                              </p>
                            </Col>
                          </Row>
                          <Row className="d-flex ps-3 pe-2 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 ">Schedule</p>
                            </Col>
                            <Col className="ms-1 detail-col-tag ">
                              <p className=" detail-page-pTag mb-1 ">
                                :{" "}
                                {`${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`}
                              </p>
                            </Col>
                          </Row>
                          <div>
                            {scheduleDetail?.teacherId?._id ? (
                              <NavLink
                                className="row mx-3 mb-2 text-decoration-none hover-zoom"
                                onClick={() =>
                                  history.push({
                                    pathname: `/teacher/profile/view`,
                                    state: {
                                      teacherId: scheduleDetail?.teacherId?._id,
                                    },
                                  })
                                }
                              >
                                <Col xs={5} className="teachers-profile-image">
                                  <Avatar
                                    name={`${scheduleDetail?.teacherId?.firstName} ${scheduleDetail?.teacherId?.lastName}`}
                                    size="40"
                                    round={true}
                                    color="silver"
                                  />
                                </Col>
                                <Col xs={7} className="teacher-detail px-3">
                                  <span>
                                    <h5 className="teachers-name mb-0">
                                      {scheduleDetail?.teacherId?.firstName}{" "}
                                      {scheduleDetail?.teacherId?.middleName}{" "}
                                      {scheduleDetail?.teacherId?.lastName}
                                    </h5>
                                  </span>
                                </Col>
                              </NavLink>
                            ) : (
                              <NavLink className="row mx-3 mb-2 text-decoration-none">
                                <Col xs={4} className="teachers-profile-image">
                                  <Avatar
                                    src={
                                      "https://www.freeiconspng.com/thumbs/warning-icon-png/warning-icon-28.png"
                                    }
                                    size="38"
                                    round={true}
                                    color="silver"
                                  />
                                </Col>
                                <Col xs={8} className="no-teacher-detail px-3">
                                  <span>
                                    <h6 className="teachers-not-name mb-0">
                                      Teacher Not Updated
                                    </h6>
                                    <h6 className="teachers-not-spec">
                                      {" "}
                                      Right Now
                                    </h6>
                                  </span>
                                </Col>
                              </NavLink>
                            )}
                          </div>
                          <Card.Footer className="course-detail-footer">
                            {scheduleDetail?.teacherId?._id ? (
                              token !== null ? (
                                <div>
                                  {role === "admin" || role === "teacher" ? (
                                    <NavLink
                                      className="enroll-NavLink-disable"
                                      to={"#"}
                                      onClick={() => {}}
                                    >
                                      Enroll
                                    </NavLink>
                                  ) : studentId === courseCheckout?.studentId ||
                                    parentId === courseCheckout?.parentId ? (
                                    <NavLink
                                      className="enroll-NavLink-disable"
                                      disabled
                                    >
                                      Enroll
                                    </NavLink>
                                  ) : currentDate > scheduleDetail.startDate ? (
                                    <NavLink
                                      className="enroll-NavLink-disable"
                                      disabled
                                    >
                                      Enroll
                                    </NavLink>
                                  ) : (
                                    <NavLink
                                      className="enroll-NavLink"
                                      to={{
                                        pathname: `/course/checkout/${courseData?.aliasName}`,
                                        state: {
                                          courseId: courseData?.id,
                                          scheduleId: scheduleDetail?.id,
                                          scheduleDetail: scheduleDetail,
                                          coursePayment:
                                            courseData?.discountAmount,
                                        },
                                      }}
                                      onClick={() => {
                                        const time = `${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`;
                                        localStorage.setItem(
                                          "courseTiming",
                                          time
                                        );
                                      }}
                                    >
                                      Enroll
                                    </NavLink>
                                  )}
                                </div>
                              ) : (
                                <NavLink className="enroll-NavLink" to={"/login"}>
                                  Enroll
                                </NavLink>
                              )
                            ) : (
                              <NavLink
                                className="enroll-NavLink-disable"
                                to={"#"}
                                onClick={() => {}}
                              >
                                Enroll
                              </NavLink>
                            )}
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Carousel breakPoints={breakPoints}>
                      {scheduleDetail.map((scheduleDetail, i) => (
                        <Card className="shadow available-time">
                          <Row className="d-flex px-3 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 fw-bold">Every</p>
                            </Col>
                            <Col className="ms-1 detail-col-tag">
                              <text className=" detail-page-pTag mb-1 ">
                                : {scheduleDetail?.weeklyOn}
                              </text>
                            </Col>
                          </Row>
                          <Row className="d-flex px-3 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 fw-bold">
                                Start Date
                              </p>
                            </Col>
                            <Col className="ms-1 ">
                              <p className=" detail-page-pTag mb-1 ">
                                {" "}
                                : {scheduleDetail?.startDate}
                              </p>
                            </Col>
                          </Row>
                          <Row className="d-flex ps-3 pe-2 py-1 course-checout-card-width">
                            <Col className="ms-1 detail-col-tag">
                              <p className=" form_text1 mb-1 fw-bold">
                                Schedule
                              </p>
                            </Col>
                            <Col className="ms-1 detail-col-tag ">
                              <p className=" detail-page-pTag mb-1 ">
                                :{" "}
                                {`${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`}
                              </p>
                            </Col>
                          </Row>
                          {scheduleDetail?.teacherId?._id ? (
                            <div
                              className="row teacher-detail-sec mb-2"
                              onClick={() =>
                                history.push({
                                  pathname: `/teacher/profile/view`,
                                  state: {
                                    teacherId: scheduleDetail?.teacherId?._id,
                                  },
                                })
                              }
                            >
                              <Col xs={5} className="teachers-profile-image">
                                <Avatar
                                  name={`${scheduleDetail?.teacherId?.firstName} ${scheduleDetail?.teacherId?.lastName}`}
                                  size="45"
                                  round={true}
                                  color="silver"
                                />
                              </Col>
                              <Col xs={7} className="teacher-detail px-3">
                                <span>
                                  <h5 className="teachers-name mb-0">
                                    {scheduleDetail?.teacherId?.firstName}{" "}
                                    {scheduleDetail?.teacherId?.middleName}{" "}
                                    {scheduleDetail?.teacherId?.lastName}
                                  </h5>
                                </span>
                              </Col>
                            </div>
                          ) : (
                            <div className="row mb-2">
                              <Col xs={4} className="teachers-profile-image">
                                <Avatar
                                  src={
                                    "https://www.freeiconspng.com/thumbs/warning-icon-png/warning-icon-28.png"
                                  }
                                  size="38"
                                  round={true}
                                  color="silver"
                                />
                              </Col>
                              <Col xs={8} className="no-teacher-detail px-2">
                                <span>
                                  <h6 className="teachers-not-name mb-0">
                                    Teacher Not Updated
                                  </h6>
                                  <h6 className="teachers-not-spec">
                                    {" "}
                                    Right Now
                                  </h6>
                                </span>
                              </Col>
                            </div>
                          )}
                          <Card.Footer>
                            {scheduleDetail?.teacherId?._id ? (
                              token !== null ? (
                                <div>
                                  {role === "admin" || role === "teacher" ? (
                                    <NavLink
                                      className="enroll-NavLink-disable"
                                      to={"#"}
                                      onClick={() => {}}
                                    >
                                      Enroll 1
                                    </NavLink>
                                  ) : (
                                    <NavLink
                                      className="enroll-NavLink"
                                      to={{
                                        pathname: `/course/checkout/${courseData?.aliasName}`,
                                        state: {
                                          courseId: courseData?.id,
                                          scheduleId: scheduleDetail?.id,
                                          scheduleDetail: scheduleDetail,
                                          coursePayment:
                                            courseData?.discountAmount,
                                        },
                                      }}
                                      onClick={() => {
                                        const time = `${scheduleDetail?.startTime} - ${scheduleDetail?.endTime}`;
                                        localStorage.setItem(
                                          "courseTiming",
                                          time
                                        );
                                      }}
                                    >
                                      Enroll 2
                                    </NavLink>
                                  )}
                                </div>
                              ) : (
                                <NavLink
                                  className="enroll-NavLink"
                                  to={"#"}
                                  onClick={() => {
                                    setShow(true);
                                  }}
                                >
                                  Enroll 3
                                </NavLink>
                              )
                            ) : (
                              <NavLink
                                className="enroll-NavLink-disable"
                                to={"#"}
                                onClick={() => {}}
                              >
                                Enroll 4
                              </NavLink>
                            )}
                          </Card.Footer>
                        </Card>
                      ))}
                    </Carousel>
                  )
                ) : (
                  <div className="d-flex justify-content-center">
                    <h6>No Scheduled Timing</h6>
                  </div>
                )} */}
      </Row>
      <Row className="mt-5">
        <div className="row-main-lessoncheckout ">
          <div className="mb-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="float-end"
              //   disabled={!showMultiplePay}
              // className={`${!showMultiplePay ? "create-disable" : "create-active"
              //     }`}
              style={{ width: "15%", height: "40px" }}
            //   onClick={() =>
            //     token
            //       ? setIsLessonCheckOut(true)
            //       : history.push("/login")
            //   }
            >
              Pay Now $0
              {/* Pay Now ${lessonPayment ? lessonPayment : 0} */}
            </Button>
          </div>
        </div>
        <h4>Course Lesson</h4>
        {/* <Divider style={{ marginBottom: "20px" }} /> */}
        <div className="material-table-responsive">
          <ThemeProvider theme={tableTheme}>
            <MaterialTable
              title="Course Details"
              columns={columns}
               data={lessonDetail}
              localization={{
                body: {
                  emptyDataSourceMessage: "Lessons Not Created",
                },
              }}

              options={{
            
                headerStyle: {
                  fontWeight: "bold",
                  backgroundColor: "#1d1464",
                  ChevronRight: '&#8250',
                  color: "white",
                  zIndex: 0,

                },
                search: false,
                toolbar: false,
              }}
            />
          </ThemeProvider>

        </div>
      </Row>
    </div>

  );
};

export default CourseDetail;
