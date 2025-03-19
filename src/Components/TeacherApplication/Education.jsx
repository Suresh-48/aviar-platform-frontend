import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../CSS/Education.css';

const Education = ({ onFormValidityChange }) => {
  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState(false);  const initialValues = {
    institutionName: '',
    degree: '',
    department: '',
    yearOfPassing: '',
    city: '',
    state: '',
    country: '',
  };

  const validationSchema = Yup.object({
    institutionName: Yup.string().required('Enter your institution name'),
    degree: Yup.string().required('Degree is required'),
    department: Yup.string().required('Enter your department'),
    yearOfPassing: Yup.string().required('Enter your year of passing'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log('Form Values:', values); // Log the form values
    navigate('/teacher/experience');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const sections = [
    { title: 'Education', onClick: () => setCurrentPage(1) },
    { title: 'Experience', onClick: () => setCurrentPage(2) },
    { title: 'Online Profile', onClick: () => setCurrentPage(3) },
    { title: 'Application Form Confirmation', onClick: () => setCurrentPage(4) },
  ];

  
    // Function to validate form
    const validateForm = () => {
      const valid = /* Your validation logic */
      setIsValid(valid);
      onFormValidityChange(valid);
    };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Container>
            <Card className="p-5 bg-light-round shadow">
              <h2 className="topic">Education Detail</h2>
              <Form onSubmit={handleSubmit}>
                <div>
                  <label>Institution Name</label>
                  <span className="text-danger">*</span>
                  <Field
                    name="institutionName"
                    type="text"
                    placeholder="Enter your institution name"
                    className="form-control field p-3 custom-border"
                    // onChange={(e) => {
                    //   setFormData({ ...formData, field: e.target.value });
                    //   validateForm();
                    // }}
                  />
                  <ErrorMessage name="institutionName" className="error text-danger" component="span" />
                </div>

                <Row>
                  <Col>
                    <label>Degree/Department</label>
                    <span className="text-danger">*</span>
                    <Field
                      name="degree"
                      type="text"
                      className="form-control field p-3"
                      placeholder="Eg: BE/CSE"
                      // onChange={(e) => {
                      //   setFormData({ ...formData, field: e.target.value });
                      //   validateForm();
                      // }}
                    />
                    <ErrorMessage name="degree" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Year of Passing</label>
                    <span className="text-danger">*</span>
                    <Field
                      name="yearOfPassing"
                      type="number"
                      className="form-control field p-3"
                      placeholder="Year of passing"
                      // onChange={(e) => {
                      //   setFormData({ ...formData, field: e.target.value });
                      //   validateForm();
                      // }}
                    />
                    <ErrorMessage name="yearOfPassing" className="error text-danger" component="span" />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label>City</label>
                    <span className="text-danger">*</span>
                    <Field
                      name="city"
                      type="text"
                      className="form-control field p-3"
                      placeholder="City"
                      // onChange={(e) => {
                      //   setFormData({ ...formData, field: e.target.value });
                      //   validateForm();
                      // }}
                    />
                    <ErrorMessage name="city" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>State</label>
                    <span className="text-danger">*</span>
                    <Field
                      name="state"
                      type="text"
                      className="form-control field p-3"
                      placeholder="State"
                      // onChange={(e) => {
                      //   setFormData({ ...formData, field: e.target.value });
                      //   validateForm();
                      // }}
                    />
                    <ErrorMessage name="state" className="error text-danger" component="span" />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label>Country</label>
                    <span className="text-danger">*</span>
                    <Field
                      name="country"
                      type="text"
                      className="form-control field p-3"
                      placeholder="Country"
                      // onChange={(e) => {
                      //   setFormData({ ...formData, field: e.target.value });
                      //   validateForm();
                      // }}
                    />
                    <ErrorMessage name="country" className="error text-danger" component="span" />
                  </Col>
                </Row>

                <br />
                <Button type="onSubmit" className="btn-primary" variant="container">
                  Next
                </Button>
              </Form>
            </Card>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default Education;