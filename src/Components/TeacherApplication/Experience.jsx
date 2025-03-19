import React from 'react';
import { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../CSS/Experience.css';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  workInstitutionName: '',
  subjectTaugt: '',
  experience: '',
  role: '',
  roleStartDate: '',
  roleEndDate: '',
  institutionAddressLine1: '',
  instutionAddresLine2: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  webSite: '',
};

const validationSchema = Yup.object({
  workInstitutionName: Yup.string().required('Work institution name is required'),
  subjectTaugt: Yup.string().required('Subject taught is required'),
  experience: Yup.string().required('Experience is required'),
  role: Yup.string().required('Role is required'),
  roleStartDate: Yup.string().required('Role start date is required'),
  roleEndDate: Yup.string().required('Role end date is required'),
  institutionAddressLine1: Yup.string().required('Institution address line 1 is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip code is required'),
});

const Experience = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log('Form Values:', values); // Log the form values
    navigate("/teacher/online/profile");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Container>
          <Card className="p-5 bg-light-round shadow">
            <Form onSubmit={handleSubmit}>
              <h2 className="heading">Experience Details</h2>

              <Row>
                <Col>
                  <label>Work Institution Name</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="workInstitutionName"
                    type="text"
                    placeholder="Work institution"
                    className="form-control"
                  />
                  <ErrorMessage name="workInstitutionName" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>Subject Taught</label>
                  <span className="text-danger">*</span>
                  <Field
                    className="form-control"
                    name="subjectTaugt"
                    type="text"
                    placeholder="Choose skills"
                  />
                  <ErrorMessage name="subjectTaugt" className="error text-danger" component="span" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Experience</label>
                  <span className="text-danger">*</span>
                  <Field
                    className="form-control"
                    name="experience"
                    placeholder="Enter your experience"
                  />
                  <ErrorMessage name="experience" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>Role</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="role"
                    type="text"
                    className="form-control"
                    placeholder="Choose the role"
                  />
                  <ErrorMessage name="role" className="error text-danger" component="span" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Role Start Date</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="roleStartDate"
                    type="text"
                    className="form-control"
                    placeholder="Select start date"
                  />
                  <ErrorMessage name="roleStartDate" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>Role End Date</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="roleEndDate"
                    type="text"
                    className="form-control"
                    placeholder="Select end date"
                  />
                  <ErrorMessage name="roleEndDate" className="error text-danger" component="span" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Institution Address Line 1</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="institutionAddressLine1"
                    type="text"
                    className="form-control"
                    placeholder="Address line 1"
                  />
                  <ErrorMessage name="institutionAddressLine1" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>Institution Address Line 2</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="instutionAddresLine2"
                    type="text"
                    className="form-control"
                    placeholder="Address line 2"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>City</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                  <ErrorMessage name="city" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>State</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="state"
                    type="text"
                    className="form-control"
                    placeholder="State"
                  />
                  <ErrorMessage name="state" className="error text-danger" component="span" />
                </Col>
                <Col>
                  <label>Country</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="country"
                    type="text"
                    className="form-control"
                    placeholder="Country"
                  />
                  <ErrorMessage name="country" className="error text-danger" component="span" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Zip Code</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="zipCode"
                    type="text"
                    className="form-control"
                    placeholder="Zip code"
                  />
                </Col>
                <Col>
                  <label>Website</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="webSite"
                    type="text"
                    className="form-control"
                  />
                </Col>
              </Row>

              <br />
              <Button type="submit" className="btn-primary" variant="container">
                Next
              </Button>
            </Form>
          </Card>
        </Container>
      )}
    </Formik>
  );
};

export default Experience;