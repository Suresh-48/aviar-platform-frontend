import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import Button from "@mui/material/Button";
import moment from "moment";
import { Divider } from "@mui/material";
import { Link, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme, alpha as muiAlpha, lighten as muiLighten, darken as muiDarken } from "@mui/material/styles";
import Carousel from "react-elastic-carousel";
import Avatar from "react-avatar";

// React Quill for rich text display
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Api
import Api from "../../Api";

// Component
import Loader from "../core/Loader";
import Label from "../../components/core/Label";

// Material Table
import MaterialTable from "@material-table/core";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farfaHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasfaHeart,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

// Table Icons
import tableIcons from "../core/TableIcons";
import {createMaterialTableCompatibleTheme} from "./createMaterialTableCompatibleTheme"
// Enhanced Theme with full Material-Table compatibility

// import createMaterialTableCompatibleTheme from "./path/to/theme";
const tableTheme = createMaterialTableCompatibleTheme();

// Carousel
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1440, itemsToShow: 5, itemsToScroll: 5 },
];

// React Quill modules for display only (read-only)
const quillModules = {
  toolbar: false,
};

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

const CourseDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  // Get aliasName from multiple sources with priority
  const aliasNameFromParams = params.aliasName || params.courseID;
  const aliasNameFromState = location.state?.aliasName;
  const courseIDFromSearch = searchParams.get('courseID');
  
  // Priority: URL params > state > search params
  const aliasName = aliasNameFromParams || aliasNameFromState || courseIDFromSearch;

  console.log("Debug - aliasName sources:", {
    aliasNameFromParams: params.aliasName || params.courseID,
    aliasNameFromState,
    courseIDFromSearch,
    finalAliasName: aliasName
  });

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [courseData, setCourseData] = useState(null);
  const [lessonDetail, setLessonDetail] = useState([]);
  const [scheduleDetail, setScheduleDetail] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [checkoutLesson, setCheckoutLesson] = useState([]);
  const [checkoutId, setCheckoutId] = useState([]);
  const [isLessonCheckOut, setIsLessonCheckOut] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [lessonPayment, setLessonPayment] = useState(0);
  const [lessonIds, setLessonIds] = useState([]);
  const [showMultiplePay, setShowMultiplePay] = useState(false);
  const [multiLessonData, setMultiLessonData] = useState([]);
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [lessonScheduleId, setLessonScheduleId] = useState(null);
  const [courseCheckout, setCourseCheckout] = useState(null);
  
  const [currentDate, setCurrentDate] = useState(moment().format("ll"));

  const ModalClose = () => {
    setIsLessonCheckOut(false);
    setLessonSchedule(null);
    setLessonScheduleId(null);
  };

  const scheduleClose = () => {
    setIsSchedule(false);
  };

  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 2000);
  };

  const getCourseDetails = async (alias) => {
    try {
      console.log("Getting course details for student...", { alias });
      const token = localStorage.getItem("token");
      const currentDate = moment().format("ll");
      setCurrentDate(currentDate);
      setToken(token || "");
      
      const userId = localStorage.getItem("userId");
      const studentId = localStorage.getItem("studentId");
      const role = localStorage.getItem("role");

      console.log("Student API Params:", { 
        userId, 
        studentId, 
        role, 
        alias,
        endpoint: `/api/v1/course/detail/${alias}`
      });

      const response = await Api.get(`/api/v1/course/detail/${alias}`, {
        params: {
          userId: userId,
          studentId: studentId,
          role: role,
        },
      });

      console.log("Student Course Details Response:", response);
      
      if (response.data && response.data.data) {
        const data = response.data.data;
        setFavourite(data.favourite || false);
        setCourseData(data.courseDetail);
        setLessonDetail(data.lessonDetail || []);
        setScheduleDetail(data.scheduleDetail || []);
        setCheckoutLesson(data.lessondata || []);
        setCheckoutId(data.checkoutLesson || []);
        setCourseCheckout(data.courseCheckout || null);
        console.log("Course data set successfully:", data.courseDetail?.name);
      } else {
        console.error("Invalid student response structure:", response);
        toast.error("Failed to load course details");
      }
    } catch (error) {
      console.error("Error fetching student course details:", error);
      console.error("Student Error response:", error?.response);
      
      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        logout();
        toast.error("Session Timeout");
      } else if (errorStatus === 404) {
        toast.error("Course not found");
      } else if (errorStatus === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to load course details");
      }
    }
  };

  const getAdminCourseDetails = async (alias) => {
    try {
      console.log("Getting course details for admin...", { alias });
      const userId = localStorage.getItem("userId");
      console.log("Admin API Params:", { 
        userId, 
        alias,
        endpoint: `/api/v1/course/detail/admin/${alias}`
      });

      const response = await Api.get(`/api/v1/course/detail/admin/${alias}`, {
        params: {
          userId: userId,
        },
      });

      console.log("Admin Course Details Response:", response);
      
      if (response.data && response.data.data) {
        const data = response.data.data;
        setCourseData(data.courseDetail);
        setLessonDetail(data.lessonDetail || []);
        setScheduleDetail(data.scheduleDetail || []);
        console.log("Admin course data set successfully:", data.courseDetail?.name);
      } else {
        console.error("Invalid admin response structure:", response);
        toast.error("Failed to load course details");
      }
    } catch (error) {
      console.error("Error fetching admin course details:", error);
      console.error("Admin Error response:", error?.response);
      
      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        logout();
        toast.error("Session Timeout");
      } else if (errorStatus === 404) {
        toast.error("Course not found");
      } else if (errorStatus === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to load course details");
      }
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        setToken(token || "");

        console.log("Current role:", role);
        console.log("Fetching data for aliasName:", aliasName);

        if (!aliasName) {
          console.error("No aliasName provided");
          toast.error("Course identifier is missing");
          setIsLoading(false);
          return;
        }

        if (role === "admin" || role === "teacher") {
          await getAdminCourseDetails(aliasName);
        } else {
          await getCourseDetails(aliasName);
        }

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error in useEffect:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsLoading(false);
        setSpinner(false);
      }
    };

    if (aliasName) {
      fetchCourseData();
    } else {
      console.error("No aliasName available to fetch course data");
      setIsLoading(false);
    }
  }, [aliasName]);

  const getMultiLessoncheckout = (list) => {
    const lessonDetails = list;
    setMultiLessonData(lessonDetails);
    
    let totalAmount = 0;
    lessonDetails.forEach((value) => {
      if (value.isCheckout === false) {
        const amount = parseInt(value.lessonDiscountAmount) || 0;
        totalAmount += amount;
      }
    });

    setLessonPayment(totalAmount);
    setShowMultiplePay(totalAmount > 0);
  };

  const lessonCheckOut = () => {
    if (!lessonScheduleId) {
      setIsSchedule(true);
      return;
    }

    const date = new Date();
    const lessonScheduledDate = new Date(lessonScheduleId.startDate);
    
    if (date < lessonScheduledDate) {
      const lessonIdsData = multiLessonData
        .filter(list => !list.isCheckout)
        .map(list => ({
          id: list.id,
          lessonDiscountAmount: list.lessonDiscountAmount
        }));
      
      navigate(`/course/checkout/${aliasName}`, {
        state: {
          courseId: courseId,
          lessonPayment: lessonPayment,
          scheduleId: lessonScheduleId,
          lessonIds: lessonIdsData,
          aliasName: aliasName,
        },
      });
    } else {
      setIsSchedule(true);
    }
  };

  const onSubmitFavourite = async (courseId) => {
    try {
      const userId = localStorage.getItem("userId");
      setSpinner(true);
      
      await Api.post(`/api/v1/favouriteCourse`, {
        courseId: courseId,
        userId: userId,
      });
      
      // Refresh course details to update favourite status
      if (role === "admin" || role === "teacher") {
        await getAdminCourseDetails(aliasName);
      } else {
        await getCourseDetails(aliasName);
      }
    } catch (error) {
      console.error("Error submitting favourite:", error);
      if (error.response?.status >= 400) {
        toast.error(error.response.data.message || "Failed to update favourite");
      }
      if (error.response?.status === 401) {
        logout();
        toast.error("Session Timeout");
      }
    } finally {
      setSpinner(false);
    }
  };

  const columns = [
    {
    title: "S.No",
    render: (rowData) => {
      // Get the actual index from the data array
      const index = lessonDetail.findIndex(item => item.id === rowData.id);
      return index !== -1 ? index + 1 : rowData.tableData.id + 1;
    },
    width: 80,
    filtering: false,
    sorting: false,
  },
    {
      title: "Lesson",
      width: "10%",
      render: (rowData) => `Lesson-${rowData.lessonNumber || rowData.tableData.id + 1}`,
    },
    { 
      title: "Lesson Name", 
      field: "lessonName", 
      width: "15%",
      cellStyle: {
        fontWeight: 'bold'
      }
    },
    {
      title: "Description",
      render: (rowData) => (
        <div className="ellipsis-text-details">
          <ReactQuill
            value={rowData.description || ""}
            readOnly={true}
            theme={"snow"}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
      ),
      cellStyle: {
        maxWidth: 450,
      },
    },
    {
      title: (
        <div>
          <p className="mb-0">Duration</p>
          <p className="mb-0">(in Hours)</p>
        </div>
      ),
      field: "duration",
      render: (rowData) => `${rowData.duration || 1} hour${rowData.duration !== 1 ? 's' : ''}`,
      width: "10%",
    },
    {
      title: "Price",
      render: (rowData) => (
        <div className="d-flex align-items-center">
          <p className="mx-2 text-success fw-bold">${rowData.lessonDiscountAmount || 0}</p>
          {rowData.lessonActualAmount > rowData.lessonDiscountAmount && (
            <p className="amount-text text-decoration-line-through text-muted">
              ${rowData.lessonActualAmount || 0}
            </p>
          )}
        </div>
      ),
      width: "15%",
    },
    {
      title: "Enroll Lesson",
      render: (rowData) => (
        <>
          {role ? (
            role === "admin" || role === "teacher" ? (
              <span className="purchased-course fw-bold text-muted">
                Checkout
              </span>
            ) : rowData.isCheckout === true ? (
              <span className="purchased-course fw-bold text-success">
                Purchased
              </span>
            ) : (
              <button
                className="fw-bold checkout-clr border-0 bg-transparent text-primary"
                onClick={() => {
                  setIsLessonCheckOut(true);
                  setCourseId(rowData?.courseId);
                  setLessonPayment(rowData?.lessonDiscountAmount || 0);
                  setLessonIds(rowData?.id ? [rowData.id] : []);
                  setShowMultiplePay(true);
                }}
              >
                Checkout
              </button>
            )
          ) : (
            <Link to={"/login"} className="fw-bold checkout-clr text-primary text-decoration-none">
              Checkout
            </Link>
          )}
        </>
      ),
      width: "15%",
    },
  ];

  const studentId = localStorage.getItem("studentId");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={tableTheme}>
      <Container className="py-3">
        <div>
          {courseData ? (
            <div className="mt-4">
              <Row>
                <Col xs={12} lg={9}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex align-items-center mb-2">
                      <h4 className="mb-0">{`${courseData?.category?.name} - ${courseData?.name}`}</h4>
                      {role !== "admin" && user !== null && (
                        <FontAwesomeIcon
                          icon={favourite ? fasfaHeart : farfaHeart}
                          color={favourite ? "crimson" : "black"}
                          className="mb-0 ms-3"
                          style={{ fontSize: 24, cursor: "pointer" }}
                          onClick={() => {
                            if (courseData?.id) {
                              onSubmitFavourite(courseData.id);
                            }
                          }}
                        />
                      )}
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <h5 className="mb-0">Amount: </h5>
                      <h5 className="discount-amt-txt mb-0 ms-1 text-success">
                        ${courseData?.discountAmount || 0}
                      </h5>
                      {courseData?.actualAmount > courseData?.discountAmount && (
                        <h5 className="actual-amt-txt mb-0 ms-1 text-muted text-decoration-line-through">
                          ${courseData?.actualAmount || 0}
                        </h5>
                      )}
                    </div>
                  </div>

                  <Divider className="my-3" />
                </Col>
              </Row>
              
              <Row>
                <Col xs={12} lg={9}>
                  <div className="course-description mb-4">
                    <ReactQuill
                      value={courseData?.description || ""}
                      readOnly={true}
                      theme={"snow"}
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                  <Divider className="my-3" />
                </Col>
                
                <Col xs={12} lg={3} className="course-image-style mb-4">
                  <Card className="shadow-sm">
                    <Card.Body className="p-0">
                      {!courseData?.imageUrl ? (
                        <img
                          className="img-fluid w-80"
                          src="https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"
                          alt="Course"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      ) : (
                        <img
                          src={courseData?.imageUrl}
                          className="img-fluid w-80"
                          alt="Course"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Available Timing Section */}
              <Row className="mb-4">
                <Col xs={12}>
                  <h4 className="row-main mb-4">Available Timing (Central Time)</h4>
                  {scheduleDetail?.length > 0 ? (
                    scheduleDetail?.length < 3 ? (
                      <Row>
                        {scheduleDetail.map((schedule, i) => (
                          <Col xs={12} sm={6} lg={4} className="mt-3" key={i}>
                            <ScheduleCard 
                              schedule={schedule} 
                              role={role}
                              token={token}
                              studentId={studentId}
                              courseCheckout={courseCheckout}
                              currentDate={currentDate}
                              courseData={courseData}
                              navigate={navigate}
                              aliasName={aliasName}
                            />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Carousel breakPoints={breakPoints}>
                        {scheduleDetail.map((schedule, i) => (
                          <div key={i} className="px-2">
                            <ScheduleCard 
                              schedule={schedule} 
                              role={role}
                              token={token}
                              studentId={studentId}
                              courseCheckout={courseCheckout}
                              currentDate={currentDate}
                              courseData={courseData}
                              navigate={navigate}
                              aliasName={aliasName}
                            />
                          </div>
                        ))}
                      </Carousel>
                    )
                  ) : (
                    <div className="d-flex justify-content-center py-4">
                      <h6 className="text-muted">No Scheduled Timing Available</h6>
                    </div>
                  )}
                </Col>
              </Row>

              {/* Course Lessons Section */}
              <Row className="mt-5">
                <Col xs={12}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                    <div>
                      <h4>Course Lessons</h4>
                    </div>
                    <div className="mb-3">
                      <Button
                        variant="contained"
                        disabled={!showMultiplePay}
                        className={!showMultiplePay ? "create-disable" : "create-active"}
                        onClick={() =>
                          token ? setIsLessonCheckOut(true) : navigate("/login")
                        }
                        size="large"
                      >
                        Pay Now ${lessonPayment || 0}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="material-table-responsive mb-3">
                    <MaterialTable
                      icons={tableIcons}
                      data={lessonDetail}
                      columns={columns}
                      onSelectionChange={(rows) => {
                        getMultiLessoncheckout(rows);
                      }}
                      localization={{
                        body: {
                          emptyDataSourceMessage: (
                            <div className="text-center py-4">
                              <h5 className="text-muted">No Lessons Available</h5>
                            </div>
                          ),
                        },
                        toolbar: {
                          searchPlaceholder: "Search lessons...",
                        },
                      }}
                      options={{
                        actionsColumnIndex: -1,
                        addRowPosition: "last",
                        headerStyle: {
                          fontWeight: "bold",
                          backgroundColor: "#1d1464",
                          color: "white",
                          fontSize: '14px'
                        },
                        rowStyle: {
                          fontSize: '14px'
                        },
                        selection: !(role === "admin" || role === "teacher"),
                        selectionProps: (rowData) => ({
                          disabled: rowData.isCheckout === true,
                          color: "primary",
                          checked: rowData.tableData?.checked || false,
                        }),
                        pageSize: 10,
                        pageSizeOptions: [5, 10, 20],
                        padding: 'dense',
                        showTextRowsSelected: false,
                      }}
                    />
                  </div>
                </Col>
              </Row>

              {spinner && (
                <div className="spanner">
                  <Spinner animation="grow" variant="light" />
                  <span>
                    <h4 style={{ paddingLeft: 20 }}>Loading...</h4>
                  </span>
                </div>
              )}

              <LessonCheckoutModal
                show={isLessonCheckOut}
                onClose={ModalClose}
                lessonSchedule={lessonSchedule}
                setLessonSchedule={setLessonSchedule}
                setLessonScheduleId={setLessonScheduleId}
                setCourseId={setCourseId}
                scheduleDetail={scheduleDetail}
                role={role}
                showMultiplePay={showMultiplePay}
                lessonPayment={lessonPayment}
                lessonCheckOut={lessonCheckOut}
              />

              <Modal
                show={isSchedule}
                centered
                onHide={scheduleClose}
              >
                <Modal.Body className="d-flex justify-content-center flex-column align-items-center py-4">
                  <FontAwesomeIcon
                    className="text-center mb-3"
                    size={50}
                    icon={faWarning}
                    color="orange"
                  />
                  <p className="mt-2 text-center">Please select a valid schedule</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button 
                    onClick={scheduleClose}
                    variant="contained"
                    color="primary"
                  >
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <div className="text-center mt-5 py-5">
              <h4 className="text-muted">Course not found</h4>
              <p className="text-muted">Please check if the course exists or try again later.</p>
              <Button 
                component={Link} 
                to="/courses"
                variant="contained"
                color="primary"
                className="mt-3"
              >
                Browse Courses
              </Button>
            </div>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
};

// Extracted Schedule Card Component
const ScheduleCard = ({ schedule, role, token, studentId, courseCheckout, currentDate, courseData, navigate, aliasName }) => {
  const hasTeacher = schedule?.teacherId?._id;
  
  const handleEnrollClick = () => {
    const time = `${schedule?.startTime} - ${schedule?.endTime}`;
    localStorage.setItem("courseTiming", time);
  };

  return (
    <Card className="shadow available-time h-100">
      <Card.Body className="pb-2">
        <Row className="d-flex px-1 py-1">
          <Col xs={4} className="detail-col-tag">
            <p className="form_text1 mb-1 fw-bold">Every</p>
          </Col>
          <Col xs={8}>
            <span className="detail-page-pTag mb-1">
              {schedule?.weeklyOn}
            </span>
          </Col>
        </Row>
        <Row className="d-flex px-1 py-1">
          <Col xs={4} className="detail-col-tag">
            <p className="form_text1 mb-1 fw-bold">Start Date</p>
          </Col>
          <Col xs={8}>
            <p className="detail-page-pTag mb-1">
              {schedule?.startDate}
            </p>
          </Col>
        </Row>
        <Row className="d-flex px-1 py-1">
          <Col xs={4} className="detail-col-tag">
            <p className="form_text1 mb-1 fw-bold">Schedule</p>
          </Col>
          <Col xs={8}>
            <p className="detail-page-pTag mb-1">
              {`${schedule?.startTime} - ${schedule?.endTime}`}
            </p>
          </Col>
        </Row>
        
        <div className="mt-3">
          {hasTeacher ? (
            <div
              className="row mx-1 mb-2 text-decoration-none hover-zoom"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate("/shared/teacher/profile/view", {
                  state: {
                    teacherId: schedule?.teacherId?._id,
                  },
                })
              }
            >
              <Col xs={3} className="teachers-profile-image">
                <Avatar
                  name={`${schedule?.teacherId?.firstName} ${schedule?.teacherId?.lastName}`}
                  size="40"
                  round={true}
                  color="#1d1464"
                />
              </Col>
              <Col xs={9} className="teacher-detail ps-2">
                <span>
                  <h6 className="teachers-name mb-0 fw-bold">
                    {schedule?.teacherId?.firstName}{" "}
                    {schedule?.teacherId?.middleName}{" "}
                    {schedule?.teacherId?.lastName}
                  </h6>
                </span>
              </Col>
            </div>
          ) : (
            <div className="row mx-1 mb-2 text-decoration-none">
              <Col xs={3} className="teachers-profile-image">
                <Avatar
                  src="https://www.freeiconspng.com/thumbs/warning-icon-png/warning-icon-28.png"
                  size="35"
                  round={true}
                  color="#6c757d"
                />
              </Col>
              <Col xs={9} className="no-teacher-detail ps-2">
                <span>
                  <h6 className="teachers-not-name mb-0 text-warning">
                    Teacher Not Assigned
                  </h6>
                  <h6 className="teachers-not-spec text-muted">
                    Currently unavailable
                  </h6>
                </span>
              </Col>
            </div>
          )}
        </div>
      </Card.Body>
      
      <Card.Footer className="course-detail-footer border-0 bg-transparent pt-0">
        {hasTeacher ? (
          token ? (
            <div>
              {role === "admin" || role === "teacher" ? (
                <span className="enroll-link-disable text-muted">
                  Enroll
                </span>
              ) : studentId === courseCheckout?.studentId ? (
                <span className="enroll-link-disable text-success fw-bold">
                  Already Enrolled
                </span>
              )
             : moment(currentDate).isAfter(moment(schedule.startDate), 'day') ? (
              //  : currentDate > schedule.startDate ? (
                <span className="enroll-link-disable text-muted">
                  Enrollment Closed
                </span>
              )
               : 
              (
             <Link
  className="enroll-link btn btn-primary w-100 text-white text-decoration-none py-2"
  to={`/shared/course/checkout/${aliasName}`}
  state={{
    courseId: courseData?.id,
    scheduleId: schedule?.id,
    scheduleDetail: schedule,
    coursePayment: courseData?.discountAmount,
    aliasName: aliasName,
  }}
  onClick={handleEnrollClick}
>
  Enroll Now
</Link>

              )}
            </div>
          ) : (
            <Link 
              className="enroll-link btn btn-outline-primary w-100 text-decoration-none py-2" 
              to={"/login"}
            >
              Login to Enroll
            </Link>
          )
        ) : (
          <span className="enroll-link-disable btn btn-secondary w-100 disabled py-2">
            Enrollment Unavailable
          </span>
        )}
      </Card.Footer>
    </Card>
  );
};

// Extracted Modal Component
const LessonCheckoutModal = ({ 
  show, 
  onClose, 
  lessonSchedule, 
  setLessonSchedule, 
  setLessonScheduleId, 
  setCourseId, 
  scheduleDetail, 
  role, 
  showMultiplePay, 
  lessonPayment, 
  lessonCheckOut 
}) => {
  return (
    <Modal show={show} centered onHide={onClose} size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <h4 className="mb-0">Select Schedule</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="container py-3 px-3">
          <Formik>
            {() => {
              return (
                <div className="mt-0">
                  <div className="mt-3">
                    <Row>
                      <Form className="category-form-style">
                        <Form.Group className="form-row mb-4" style={{ width: "100%" }}>
                          <Label notify={true}>Select Time Slot</Label>
                          <Select
                            className="form-styles align-self-center"
                            placeholder="Choose a schedule..."
                            value={lessonSchedule}
                            onChange={(e) => {
                              setLessonSchedule(e);
                              setLessonScheduleId(e.lessonScheduleId);
                              setCourseId(e.lessonScheduleId?.courseId || "");
                            }}
                            options={scheduleDetail
                              .filter(item => item.teacherId)
                              .map((item) => ({
                                label: `${item.startDate} - ${item.startTime} to ${item.endTime} (${item.weeklyOn})`,
                                value: item.id,
                                lessonScheduleId: item,
                              }))}
                            styles={{
                              control: (base) => ({
                                ...base,
                                border: '2px solid #e9ecef',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                '&:hover': {
                                  borderColor: '#1d1464'
                                }
                              })
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </Row>
                    <Row className="button-content-style mt-4">
                      <Col xs={6} sm={6} md={6}>
                        <Button
                          fullWidth
                          className="Kharpi-cancel-btn"
                          variant="outlined"
                          style={{ width: "100%", borderRadius: 8 }}
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col xs={6} sm={6} md={6}>
                        {role === "admin" || role === "teacher" ? (
                          <div></div>
                        ) : (
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={!showMultiplePay || !lessonSchedule ? "create-disable" : "create-active"}
                            onClick={lessonCheckOut}
                            disabled={!showMultiplePay || !lessonSchedule}
                            style={{ borderRadius: 8 }}
                          >
                            Pay Now ${lessonPayment}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CourseDetail;