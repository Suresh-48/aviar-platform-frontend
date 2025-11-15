import React, { useState, useEffect } from "react";
import { Container, Row, Table, Button, Modal, Col, Card } from "react-bootstrap";
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
  const [dateAndTime, setDateAndTime] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [status, setStatus] = useState("");
  const [courseScheduleId, setCourseScheduleId] = useState(null);
  const [zoomStartTimeGet, setZoomStartTimeGet] = useState("");
  const [sessionEndModal, setSessionEndModal] = useState(false);

  // Close alert modal
  const closeShow = () => setShowAlert(false);

  useEffect(() => {
    const teacherIdFromStorage = localStorage.getItem("teacherId");
    if (!teacherIdFromStorage) return;

    setTeacherId(teacherIdFromStorage);

    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        // Fetch teacher status
        const teacherRes = await Api.get(`api/v1/teacher/${teacherIdFromStorage}`);
        const teacherStatus = teacherRes?.data?.data?.getOne?.status || "Pending";
        setStatus(teacherStatus);

        // Fetch dashboard & upcoming schedule data
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

    // Set up current date/time
    const current = moment().tz("America/Chicago");
    setCurrentDate(current.format("ll"));
    setLessTime(current.format("HH:mm"));
  }, []);

  // Get Teacher Upcoming Schedule
  const TeacherUpcomingScheduleData = async (teacherId) => {
    try {
      const response = await Api.get("/api/v1/teacherUpcomingSchedule/upcoming", {
        params: { teacherId },
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
  const getTeacherCourseCount = async (teacherId) => {
    try {
      const response = await Api.get("/api/v1/dashboard/teacher", {
        params: { teacherId },
      });
      setData(response?.data?.data || {});
    } catch (error) {
      console.error("Error fetching course count:", error);
      setData({});
    }
  };

  const handleModal = () => setShow(false);

  const zoomTiming = async (actionType) => {
    if (!courseScheduleId) return;

    const teacherId = localStorage.getItem("teacherId");
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
        teacherId: teacherId,
      });

      if (actionType === "open") {
        const ZoomstartTime = res.data?.zoomDetails?.zoomStartTime;
        setZoomStartTimeGet(ZoomstartTime);
      }
    } catch (error) {
      console.error("Error updating zoom timing:", error);
    }
  };

  const showModal = () => {
    setSessionEndModal(false);
    setTimeout(() => {
      setSessionEndModal(true);
    }, 300000); // 5 mins
  };

  if (isLoading) return <Loading />;

  console.log(status, "status")

  if (status === "Pending") return <DisplayTeacherApplication />;

  return (
    <Container className="mt-4">
      {/* Dashboard Stats */}
      <Row className="gy-4 mt-2">
        <Col md={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3">
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

        <Col md={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3">
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

        <Col md={4}>
          <Card className="dashboard-card shadow-sm border-0 p-3">
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
      <Row style={{ minHeight: "227px", marginTop: 150 }}>
        <div>
          <h4>Upcoming Schedule</h4>
        </div>
        <Table striped bordered hover responsive>
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
                <tr key={i} className="viewRow">
                  <td>{i + 1}</td>
                  <td>{list.lessonDate}</td>
                  <td>{list.courseScheduleId?.startTime || "-"}</td>
                  <td>{list.courseScheduleId?.endTime || "-"}</td>
                  <td className="linkColor">{list.courseId?.name || "-"}</td>
                  <td>{list.courseLessonId?.lessonName || "-"}</td>
                  <td>{list.courseId?.duration ? `${list.courseId.duration} hour` : "-"}</td>
                  <td>
                    <p
                      className={
                        list.lessonDate === currentDate && list.courseScheduleId?.zoomTime <= lessTime
                          ? "zoom-view-style"
                          : "zoom-view-disable-style"
                      }
                      onClick={() => {
                        setCourseScheduleId(list);
                        if (list.lessonDate === currentDate && list.courseScheduleId?.zoomTime <= lessTime) {
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
                    </p>
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
      </Row>

      {/* Zoom Session Modal */}
      {isTeacher && (
        <>
          <Modal show={show} centered backdrop="static">
            <Modal.Header className="border-bottom-0 pb-0" />
            <Modal.Body className="zoom-modal-popup pt-0">
              <div className="align-items-center zoom-content text-center">
                <h4 className="mt-2">Are you sure to start the session?</h4>
                <Col className="mt-4">
                  <Button variant="outline-secondary px-4 me-2" onClick={handleModal}>
                    NO
                  </Button>
                  <Button
                    variant="info"
                    className="px-4"
                    onClick={() => {
                      zoomTiming("open");
                      setShow(false);
                      showModal();
                      window.open(`${zoomLink?.zoomId}+${zoomLink?.zoomPassword}`, "_blank");
                    }}
                  >
                    YES
                  </Button>
                </Col>
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={sessionEndModal} centered backdrop="static" className="p-3">
            <Modal.Header className="border-bottom-0 pb-0" />
            <Modal.Body>
              <h4 className="mt-2 text-center">Session has ended!</h4>
              <Col className="d-flex justify-content-center mt-4 mb-2">
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => {
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
              </Col>
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
              Zoom Link activates 15 minutes before (
              {dateAndTime?.lessonDate || "unknown date"})
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
