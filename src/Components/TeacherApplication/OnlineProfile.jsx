import React from 'react';
import { Container, Row, Col, FormGroup, Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../CSS/OnlineProfile.css';

const OnlineProfile = ({ onFormValidityChange, onSubmit, setOnlineProfileData }) => {
  const initialValues = {
    professionalWebSite: '',
    facebook: '',
    linkedIn: '',
    additionalInformation: '',
  };

  const validationSchema = Yup.object({
    professionalWebSite: Yup.string().required('Professional website is required'),
    facebook: Yup.string().required('Facebook link is required'),
    linkedIn: Yup.string().required('LinkedIn link is required'),
    additionalInformation: Yup.string().required('Additional information is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Values:', values); // Log the form values
    setOnlineProfileData(values); // Update parent state with form data
    onSubmit(); // Trigger navigation to the next step
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isValid, dirty }) => {
        // Notify parent about form validity
        React.useEffect(() => {
          console.log('isValid:', isValid, 'dirty:', dirty); // Debugging
          onFormValidityChange(isValid && dirty);
        }, [isValid, dirty, onFormValidityChange]);

        return (
          <Container>
            <Card className="p-5 bg-light-round shadow">
              <Form onSubmit={handleSubmit}>
                <h2 className="profileheading">Online Profile Details</h2>
                <FormGroup>
                  <label>Professional Website:</label>
                  <span className="text-danger">*</span>
                  <br />
                  <Field
                    id="myInputs"
                    name="professionalWebSite"
                    type="text"
                    placeholder="Enter Website"
                    className="form-control form-control-lg"
                  />
                  <ErrorMessage name="professionalWebSite" className="error text-danger" component="span" />
                </FormGroup>
                <br />
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Enter Facebook Link:</label>
                      <span className="text-danger">*</span>
                      <br />
                      <Field
                        id="myInputs"
                        className="form-control form-control-lg"
                        name="facebook"
                        type="text"
                        placeholder="Enter Facebook Link"
                      />
                      <ErrorMessage name="facebook" className="error text-danger" component="span" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>LinkedIn</label>
                      <span className="text-danger">*</span>
                      <br />
                      <Field
                        id="myInputs"
                        className="form-control form-control-lg"
                        style={{ marginRight: 20, width: '100%' }}
                        name="linkedIn"
                        type="text"
                        placeholder="Enter LinkedIn Address"
                      />
                      <ErrorMessage name="linkedIn" className="error text-danger" component="span" />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <FormGroup
                  className="form-row mb-3 input-text-style"
                  style={{ marginRight: 20, width: '100%' }}
                >
                  <label className="mb-2">Additional Information:</label>
                  <span className="text-danger">*</span>
                  <br />
                  <Field
                    as="textarea"
                    style={{ width: '100%', height: '168px' }}
                    name="additionalInformation"
                    id="additionalInformation"
                    className="form-control form-control-lg"
                  />
                  <ErrorMessage name="additionalInformation" className="error text-danger" component="span" />
                </FormGroup>
                <br />
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  Submit
                </button>
              </Form>
            </Card>
          </Container>
        );
      }}
    </Formik>
  );
};

export default OnlineProfile;