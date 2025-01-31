import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './css/Admindashboard.css';

const Admindashboard = () => {
  return (
    <div>
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Teachers</Card.Title>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Students</Card.Title>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Courses</Card.Title>
                <Card.Text className="text-primary">1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Approved Teachers</Card.Title>
                <Card.Text className="text-primary">0</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Pending Teachers</Card.Title>
                <Card.Text className="text-primary">1</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center bg-light rounded shadow">
              <Card.Body>
                <Card.Title>Amount Received ($)</Card.Title>
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