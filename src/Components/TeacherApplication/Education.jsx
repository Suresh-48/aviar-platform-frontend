import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Card, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import '../CSS/Education.css';

const Education = ({ onFormValidityChange, onSubmit, setEducationData }) => {
  const initialValues = {
    institutionName: '',
    degree: '',
    yearOfPassing: '',
    city: '',
    state: '',
    country: '',
  };

  const validationSchema = Yup.object({
    institutionName: Yup.string().required('Enter your institution name'),
    degree: Yup.string().required('Degree is required'),
    yearOfPassing: Yup.string().required('Enter your year of passing'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    setEducationData(values); // Update parent state
    onSubmit(); // Move to the next step
  };

  return (
    <Container>
      <Card className="p-5 bg-light-round shadow">
        <h2 className="topic">Education Detail</h2>
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
                <div>
                  <label>Institution Name</label>
                  <span className="text-danger">*</span>
                  <br />
                  <Field
                    name="institutionName"
                    type="text"
                    placeholder="Enter your institution name"
                    className="form-control field custom-border bg-white form-control-lg"
                  />
                  <ErrorMessage name="institutionName" className="error text-danger" component="span" />
                </div>
                <br />
                <Row>
                  <Col>
                    <label>Degree</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="degree"
                      type="text"
                      className="form-control field form-control-lg"
                      placeholder="Eg: BE/CSE"
                    />
                    <ErrorMessage name="degree" className="error text-danger" component="span" />
                  </Col>
                  <Col>
                    <label>Year of Passing</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="yearOfPassing"
                      type="number"
                      className="form-control field form-control-lg"
                      placeholder="Year of passing"
                    />
                    <ErrorMessage name="yearOfPassing" className="error text-danger" component="span" />
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
                      className="form-control field form-control-lg"
                      placeholder="City"
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
                      className="form-control field form-control-lg"
                      placeholder="State"
                    />
                    <ErrorMessage name="state" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label>Country</label>
                    <span className="text-danger">*</span>
                    <br />
                    <Field
                      name="country"
                      type="text"
                      className="form-control field form-control-lg"
                      placeholder="Country"
                    />
                    <ErrorMessage name="country" className="error text-danger" component="span" />
                  </Col>
                </Row>
                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Container>
  );
};

export default Education;