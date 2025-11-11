import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Card, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import '../CSS/Experience.css';

const Experience = ({ onFormValidityChange, onSubmit, setExperienceData }) => {
  const initialValues = {
    workInstitutionName: '',
    subjectTaught: '',
    experience: '',
    role: '',
    roleStartDate: '',
    roleEndDate: '',
    institutionAddressLine1: '',
    institutionAddressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    webSite: '',
  };

  const validationSchema = Yup.object({
    workInstitutionName: Yup.string().required('Work institution name is required'),
    subjectTaught: Yup.string().required('Subject taught is required'),
    experience: Yup.string().required('Experience is required'),
    role: Yup.string().required('Role is required'),
    roleStartDate: Yup.string().required('Role start date is required'),
    roleEndDate: Yup.string().required('Role end date is required'),
    institutionAddressLine1: Yup.string().required('Institution address line 1 is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('Zip code is required'),
    webSite: Yup.string().required('Website is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    setExperienceData(values); // Update parent state
    onSubmit(); // Move to the next step
  };

  return (
    <Container>
      <Card className="p-5 bg-light-round shadow">
        <h2 className="heading">Experience Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => {
            React.useEffect(() => {
              onFormValidityChange(isValid && dirty);
            }, [isValid, dirty, onFormValidityChange]);

            return (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <label>Work Institution Name</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="workInstitutionName"
                      type="text"
                      placeholder="Work institution"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="workInstitutionName" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Subject Taught</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="subjectTaught"
                      type="text"
                      placeholder="Subject taught"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="subjectTaught" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Experience</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="experience"
                      type="text"
                      placeholder="Enter your experience"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="experience" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Role</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="role"
                      type="text"
                      placeholder="Choose the role"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="role" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Role Start Date</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="roleStartDate"
                      type="date"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="roleStartDate" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Role End Date</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="roleEndDate"
                      type="date"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="roleEndDate" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Institution Address Line 1</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="institutionAddressLine1"
                      type="text"
                      placeholder="Address line 1"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="institutionAddressLine1" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Institution Address Line 2</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="institutionAddressLine2"
                      type="text"
                      placeholder="Address line 2"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="institutionAddressLine2" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>City</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="city"
                      type="text"
                      placeholder="City"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="city" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>State</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="state"
                      type="text"
                      placeholder="State"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="state" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Country</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="country"
                      type="text"
                      placeholder="Country"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="country" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Zip Code</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="zipCode"
                      type="text"
                      placeholder="Zip code"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="zipCode" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Website</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="webSite"
                      type="text"
                      placeholder="Website"
                      className="form-control form-control-lg"
                    />
                    <ErrorMessage name="webSite" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Container>
  );
};

export default Experience;