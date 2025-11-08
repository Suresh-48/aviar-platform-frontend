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
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import "../CSS/CourseDetail.css";
import Button from "@material-ui/core/Button";
const CourseDetail = () => {
    const [showMultiplePay, setShowMultiplePay] = useState(false);
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
                                style={{width:"15%",height:"40px"}}
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
                            localization={{
                                body: {
                                    emptyDataSourceMessage: "Lessons Not Created",
                                },
                            }}

                            options={{
                                showTitle: false,
                                headerStyle: {
                                    fontWeight: "bold",
                                    backgroundColor: "#1d1464",
                                    ChevronRight: '&#8250',
                                    color: "white",
                                    zIndex: 0,

                                },
                                 showTitle: false,
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
