import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './css/Admindashboard.css';

const Admindashboard = () => {
  return (
    <div>
      <Container>
        {/* First Row */}
        <Row className="mb-4">
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size">
              <Card.Body>
                <h4>Teachers</h4>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size">
              <Card.Body>
                <h4>Students</h4>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size">
              <Card.Body>
                <h4>Courses</h4>
                <Card.Text className="text-primary">1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Row */}
        <Row>
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size mt-5">
              <Card.Body>
                <h4>Approved Teachers</h4>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size mt-5">
              <Card.Body>
                <h4>Pending Teachers</h4>
                <Card.Text className="text-primary">1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="flex-grow-1 text-center bg-light rounded shadow card-size mt-5">
              <Card.Body>
                <h4>Amount Received ($)</h4>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admindashboard;