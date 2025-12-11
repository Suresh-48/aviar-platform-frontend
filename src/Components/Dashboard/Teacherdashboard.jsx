import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import DisplayTeacherApplication from "../TeacherApplication/DisplayAplication";
import Api from "../../Api";
import Loading from "../../Loading";
import "./CSS/TeacherDashboard.css";

function TeacherDashboard() {
  const [data, setData] = useState({});
  const [upComingData, setUpcomingData] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [lessTime, setLessTime] = useState("");
  const [dateAndTime, setDateAndTime] = useState(null);
  const [zoomLink, setZoomLink] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [status, setStatus] = useState("");
  const [courseScheduleId, setCourseScheduleId] = useState(null);
  const [zoomStartTimeGet, setZoomStartTimeGet] = useState("");
  const [sessionEndModal, setSessionEndModal] = useState(false);

  // Close alert modal
  const closeShow = () => setShowAlert(false);

  // Fetch on mount: teacherId, dashboard counts and upcoming schedule
  useEffect(() => {
    const teacherIdFromStorage = localStorage.getItem("teacherId");
    if (!teacherIdFromStorage) {
      setIsLoading(false);
      return;
    }

    setTeacherId(teacherIdFromStorage);

    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        // Teacher status
        const teacherRes = await Api.get(`api/v1/teacher/${teacherIdFromStorage}`);
        const teacherStatus = teacherRes?.data?.data?.getOne?.status || "Pending";
        setStatus(teacherStatus);

        await Promise.all([
          getTeacherCourseCount(teacherIdFromStorage),
          TeacherUpcomingScheduleData(teacherIdFromStorage),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();

    // Set current date/time in America/Chicago as you had
    const current = moment().tz("America/Chicago");
    setCurrentDate(current.format("ll")); // e.g., "Nov 15, 2025"
    setLessTime(current.format("HH:mm")); // 24h format for comparison
  }, []);

  // Get Teacher Upcoming Schedule
  const TeacherUpcomingScheduleData = async (teacherIdParam) => {
    try {
      const response = await Api.get("/api/v1/teacherUpcomingSchedule/upcoming", {
        params: { teacherId: teacherIdParam },
      });
      const dataValues = response?.data?.upcomingList || [];
      dataValues.sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));
      setUpcomingData(dataValues);
    } catch (error) {
      console.error("Error fetching upcoming schedule:", error);
      setUpcomingData([]);
    }
  };

  // Get Teacher Dashboard Course Count
  const getTeacherCourseCount = async (teacherIdParam) => {
    try {
      const response = await Api.get("/api/v1/dashboard/teacher", {
        params: { teacherId: teacherIdParam },
      });
      setData(response?.data?.data || {});
    } catch (error) {
      console.error("Error fetching course count:", error);
      setData({});
    }
  };

  const handleModal = () => setShow(false);

  // Update zoom timing (open/close)
  const zoomTiming = async (actionType) => {
    if (!courseScheduleId) return;

    const teacherIdLocal = localStorage.getItem("teacherId");
    const now = new Date();
    const sessionTiming = now.toLocaleTimeString();
    const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    try {
      const res = await Api.patch("/api/v1/teacherUpcomingSchedule/zoom/timing", {
        teacherUpcomingScheduleId: courseScheduleId.id,
        courseName: courseScheduleId.courseId?.aliasName,
        lessonName: courseScheduleId.courseLessonId?.lessonName,
        teacherPayableAmount: courseScheduleId.teacherId?.teacherSessionAmount,
        zoomStartTime: actionType === "open" ? sessionTiming : zoomStartTimeGet,
        zoomEndTime: actionType === "close" ? sessionTiming : "",
        date: date,
        teacherId: teacherIdLocal,
      });

      if (actionType === "open") {
        const ZoomstartTime = res.data?.zoomDetails?.zoomStartTime;
        setZoomStartTimeGet(ZoomstartTime);
      }
    } catch (error) {
      console.error("Error updating zoom timing:", error);
    }
  };

  // Start a delayed modal for session end (5 minutes after start)
  const showModal = () => {
    setSessionEndModal(false);
    // Clear any previous timers by storing ID? Keep simple: set new timer
    setTimeout(() => {
      setSessionEndModal(true);
    }, 300000); // 5 minutes
  };

  // Loading or application pending view
  if (isLoading) return <Loading />;
  if (status === "Pending") return <DisplayTeacherApplication />;

  // Helper to decide if "Join" should be active
  const isJoinActive = (list) => {
    try {
      return (
        list.lessonDate === currentDate &&
        list.courseScheduleId &&
        list.courseScheduleId.zoomTime &&
        list.courseScheduleId.zoomTime <= lessTime
      );
    } catch {
      return false;
    }
  };

  return (
    <Container fluid className="mt-4 teacher-dashboard-container">
      {/* Dashboard Stats */}
      <Row className="gy-4 mt-2">
        <Col xs={12} sm={6} lg={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title className="mb-1 fw-bold text-secondary">Total Courses</Card.Title>
                <h3 className="fw-bold text-dark">{data?.totalCourse || 0}</h3>
                <Link to={`/teacher/schedule/${teacherId}`} className="small-link">
                  View Details →
                </Link>
              </div>

              <div className="dashboard-icon bg-primary text-white">
                <i className="bi bi-journal-bookmark"></i>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title className="mb-1 fw-bold text-secondary">Pending Payment</Card.Title>
                <h3 className="fw-bold text-warning">{data?.pendingPayment || 0}</h3>
                <Link to="#" className="small-link">
                  View Payments →
                </Link>
              </div>

              <div className="dashboard-icon bg-warning text-white">
                <i className="bi bi-clock-history"></i>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title className="mb-1 fw-bold text-secondary">Received Payment</Card.Title>
                <h3 className="fw-bold text-success">{data?.receivedPayment || 0}</h3>
                <Link to="#" className="small-link">
                  View Details →
                </Link>
              </div>

              <div className="dashboard-icon bg-success text-white">
                <i className="bi bi-wallet2"></i>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Schedule */}
      <Row className="mt-5">
        <Col xs={12}>
          <h4 className="mb-3">Upcoming Schedule</h4>
        </Col>

        <Col xs={12}>
          <div className="table-responsive dashboard-table-wrapper">
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr className="viewRow">
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Course Name</th>
                  <th>Lesson Name</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upComingData.length > 0 ? (
                  upComingData.slice(0, 5).map((list, i) => (
                    <tr key={list.id || i} className="viewRow">
                      <td>{i + 1}</td>
                      <td>{list.lessonDate || "-"}</td>
                      <td>{list.courseScheduleId?.startTime || "-"}</td>
                      <td>{list.courseScheduleId?.endTime || "-"}</td>
                      <td className="linkColor">{list.courseId?.name || "-"}</td>
                      <td>{list.courseLessonId?.lessonName || "-"}</td>
                      <td>{list.courseId?.duration ? `${list.courseId.duration} hour` : "-"}</td>
                      <td>
                        <button
                          className={`btn btn-sm ${isJoinActive(list) ? "btn-outline-primary" : "btn-outline-secondary disabled"
                            }`}
                          onClick={() => {
                            setCourseScheduleId(list);
                            if (isJoinActive(list)) {
                              // open join modal
                              setShow(true);
                              setIsTeacher(true);
                              setZoomLink(list.courseLessonId);
                            } else {
                              setShowAlert(true);
                              setDateAndTime(list);
                            }
                          }}
                        >
                          Join
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Records to Display
                    </td>
                  </tr>
                )}

                {upComingData.length > 5 && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <Link to={`/upcoming/teacher/schedule/list`} className="viewAll-link">
                        View All
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Zoom Session Modal */}
      {isTeacher && (
        <>
          <Modal show={show} centered backdrop="static" onHide={() => setShow(false)}>
            <Modal.Header closeButton className="border-bottom-0 pb-0" />
            <Modal.Body className="zoom-modal-popup pt-0">
              <div className="align-items-center zoom-content text-center">
                <h4 className="mt-2">Are you sure to start the session?</h4>
                <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <Button variant="outline-secondary" onClick={handleModal}>
                    NO
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => {
                      zoomTiming("open");
                      setShow(false);
                      showModal();
                      // Open zoom link in new tab. original format preserved.
                      window.open(`${zoomLink?.zoomId}+${zoomLink?.zoomPassword}`, "_blank");
                    }}
                  >
                    YES
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={sessionEndModal} centered backdrop="static" onHide={() => setSessionEndModal(false)}>
            <Modal.Header closeButton className="border-bottom-0 pb-0" />
            <Modal.Body>
              <h4 className="mt-2 text-center">Session has ended!</h4>
              <div className="d-flex flex-column flex-sm-row justify-content-center mt-4 gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    // Restart session
                    zoomTiming("open");
                    setShow(false);
                    showModal();
                    window.open(`${zoomLink?.zoomId}+${zoomLink?.zoomPassword}`, "_blank");
                  }}
                >
                  Restart Session
                </Button>
                <Button
                  className="create-active"
                  onClick={() => {
                    zoomTiming("close");
                    setSessionEndModal(false);
                  }}
                >
                  End Session
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}

      {/* Alert Modal */}
      <Modal show={showAlert} centered onHide={closeShow}>
        <Modal.Body>
          <div className="text-center">
            <h5>Notification</h5>
            <p>
              Zoom Link activates 15 minutes before ({dateAndTime?.lessonDate || "unknown date"})
            </p>
            <Button variant="light" onClick={closeShow}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TeacherDashboard;
