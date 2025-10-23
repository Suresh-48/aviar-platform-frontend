import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const TeacherApplicationForm = ({
  educationData,
  experienceData,
  onlineProfileData,
}) => {
  return (
    <Container>
      {/* Education Information Section */}
      <hr />
      <h2>EDUCATION INFORMATION</h2>
      <br />
      <Row>
        <Col>
          <p><strong>Institution Name:</strong> {educationData?.institutionName || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Subject:</strong> {educationData?.subject || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Year of Passing:</strong> {educationData?.yearOfPassing || 'N/A'}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p><strong>State:</strong> {educationData?.state || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>City:</strong> {educationData?.city || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Country:</strong> {educationData?.country || 'N/A'}</p>
        </Col>
      </Row>
      <br />

      {/* Working Information Section */}
      <hr />
      <h2>WORKING INFORMATION</h2>
      <br />
      <Row>
        <Col>
          <p><strong>Working Institution Name:</strong> {experienceData?.institutionName || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Subject Taught:</strong> {experienceData?.subjectTaught || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Years of Experience:</strong> {experienceData?.yearsOfExperience || 'N/A'}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p><strong>Role:</strong> {experienceData?.role || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Start Date:</strong> {experienceData?.startDate || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>End Date:</strong> {experienceData?.endDate || 'N/A'}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p><strong>Address Line 1:</strong> {experienceData?.addressLine1 || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Address Line 2:</strong> {experienceData?.addressLine2 || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>State:</strong> {experienceData?.state || 'N/A'}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p><strong>City:</strong> {experienceData?.city || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Country:</strong> {experienceData?.country || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Zip Code:</strong> {experienceData?.zipCode || 'N/A'}</p>
        </Col>
      </Row>
      <Row>
        <p><strong>Website:</strong> {experienceData?.website || 'N/A'}</p>
      </Row>
      <br />

      {/* Profile Information Section */}
      <hr />
      <h2>PROFILE INFORMATION</h2>
      <br />
      <Row>
        <Col>
          <p><strong>Professional Websites:</strong> {onlineProfileData?.professionalWebsites || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>Facebook:</strong> {onlineProfileData?.facebook || 'N/A'}</p>
        </Col>
        <Col>
          <p><strong>LinkedIn:</strong> {onlineProfileData?.linkedin || 'N/A'}</p>
        </Col>
      </Row>
      <br />
      <Row>
        <p><strong>Additional Information:</strong> {onlineProfileData?.additionalInformation || 'N/A'}</p>
      </Row>
    </Container>
  );
};

export default TeacherApplicationForm;