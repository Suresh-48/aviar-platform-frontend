import React, { useState, useEffect } from "react";
import { Container, Row, Table, Button, Modal, Col , Offcanvas } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
import "../CSS/Studentdashboard.css";
import {Card} from "react-bootstrap";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";


// Component
// import Loader from "../core/Loader";
// import DashboardTiles from './Dashboar/DashboardTiles';

// Api
// import Api from "../../Api";


function TeacherDashboard() {
  const [data, setData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  // const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [CurrentDate, setCurrentDate] = useState("");
  const [lessTime, setLessTime] = useState("");
  const [DateAndTime, setDateAndTime] = useState("");
  // const [ZoomLink, setZoomLink] = useState("");
 
  const [showAlert, setshowAlert] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [studentCourseScheduleId, setStudentCourseScheduleId] = useState("");
  const [sessionEndModal, setSessionEndModal] = useState(false);
  // const [zoomStartTimeGet, setZoomStartTimeGet] = useState("");
  const studentId = localStorage.getItem("studentId");
  // const [show, setshow] = useState(false);
   const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

  return (
    <div>
   : (
        <Container>
          
          <div>
            <Row>
              <Col >
              <Card className="  bg-light rounded shadow p-4 col-6 ">    
             <h4 className="text-center">Active Enroll courses</h4>  
            <h4 className="text-center text-primary">0</h4> 

          </Card>
              </Col>
            
         
          
      
          
            <Col >
            <Card className=" bg-light rounded shadow p-4 col-6" style={{}}>
             <h4 className="text-center">Completed courses</h4> 
             <h4 className=" text-center text-primary ">0</h4>
              </Card>
            </Col>
          </Row>
          
          
          </div>
         
     
          
          
          <Row className="main-card pb-3">
             {/* <DashboardTiles
              label="Active Enrolled Courses"
              count={data.activeCourse}
              url="/active/enroll/course/list"
            />  */}

             {/* <DashboardTiles label="Completed Courses" count={data.completeCourse} url="/completed/course/list" />  */}
          </Row>

          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <div className="ms-1 mt-5">
                <h4>Upcoming Schedule</h4>
              </div>
              <div>
                <Button
                  variant="primary"
                  className="Aviar-save-btn me-2 px-3"
                >
                  Enroll
                </Button>
              </div>
            </div>
            {/* <Row className="mt-0" style={{ minHeight: "227px" }}>
              <Table striped bordered hover className="student-table" responsive>
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
                  {upcomingData?.length > 0 ? (
                    upcomingData.slice(0, 5).map((list, i) => (
                      <tr className="viewRow">
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                 
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="colspan-data-alignment">
                        <h6 className="d-flex justify-content-center">No Records To Display</h6>
                      </td>
                    </tr>
                  )}
             
                </tbody>
              </Table>
            </Row> */}
          </div>
       </Container>
        <div className="sidebar">
           <h4 className="text-center" style={{color:"white"}}>Dashboard</h4> 
           <h4 className="text-center p-4" style={{color:"white"}}> my profile </h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Upcoming shcedule</h4>
           <h4 className="text-center p-4" style={{color:"white"}}> courses</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Favrite courses</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Quiz</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Home work</h4>
           <h4 className="text-center p-4" style={{color:"white"}}> Transcripted</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Active courses</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>Forum</h4>
           <h4 className="text-center p-4" style={{color:"white"}}>completed course</h4>
            <h4 className="text-center p-4" style={{color:"white"}}> Course History</h4>  
              </div>
      )
    

    
    </div>
  );
}

export default TeacherDashboard;
