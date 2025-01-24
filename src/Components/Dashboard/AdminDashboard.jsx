
import React, { useState, useEffect } from "react";
import { Container, Row, Button, Modal, Alert } from "react-bootstrap";

// Component
import DashboardTiles from "../../components/core/core/DashboardTiles";

// Api
import Api from "../../Api";
import Loader from "../core/Loader";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
const AdminDashboard = () => {
  const [adminDashboard, setAdminDashboard] = useState("");
  const [approvedData, setApprovedData] = useState("");
  const [pendingData, setPendingData] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const history = useHistory();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const browserHistory = createBrowserHistory();

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    getTeacherApprovedListData();
    getAdminDashboard();
    getTeacherPendingListData();
  }, []);
 
      
  return (
    <div className="admin-dashboard-min-height mt-2">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Row className="mb-4">
            <DashboardTiles label="Parents" count={adminDashboard?.totalParent} url="/parents/list" />
            <DashboardTiles label="Students" count={adminDashboard?.totalStudent} url="/students/list" />
            <DashboardTiles label="Courses" count={adminDashboard?.totalCourse} url="/course/list" />
            <DashboardTiles
              label="Approved Teachers"
              count={approvedData?.length}
              url={{
                pathname: "/teacher/list",
                state: {
                  indexCount: 0,
                },
              }}
            />
            <DashboardTiles
              label="Pending Teachers"
              count={pendingData?.length}
              url={{
                pathname: "/teacher/list",
                state: {
                  indexCount: 1,
                },
              }}
            />
            <DashboardTiles label="Amount Received ($)" count={adminDashboard?.totalAmount} url="/payment/list" />
          </Row>
        )}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;


