import React from 'react'
import{useState} from 'react'
import{Container,Row,Col,FormGroup, Button,Card} from "react-bootstrap"
import {Field, Formik,Form }from 'formik'
import * as Yup from "yup"
import '../CSS/OnlineProfile.css';
import { useNavigate } from 'react-router-dom'
 const OnlineProfile = () => {
   const initialValues={
   professtionalWebSite:"",
   facebook:"",
   linkedIn:"",
   additionalInformation:"",
    }
    const navigate = useNavigate();
    const onSubmit=(values)=>{
        console.log("values",values);
        navigate("/teacher/application form")
    }
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    >
         {({ handleSubmit }) => (
            <>
            <Container>
            <Card className="p-5 bg-light-round shadow">
                <Form onSubmit={handleSubmit}>
                  <h2 className='profileheading'>Online Profile Details</h2>
                    <FormGroup>
                    <label>Professional WebSite:</label>
                    <Field
                    name="professtionalWebsite"
                    type="text"
                    placeholder="Enter WebSite"
                    className="form-control"
                   />
                   </FormGroup>
                   <Row>
                    <Col>
                    <FormGroup>
                    <label>Enter FaceBook Link:</label>

                    <Field
                    className="form-control"
                    name="facebook"
                    type="text"
                    placeholder="Enter Facebook Link"
                    />
                      </FormGroup>
                    </Col>
                  
                    <Col>
                    <FormGroup>
                    <label>Linkedin</label>
                  

                    <Field
                    className="form-control"   style={{ marginRight: 20, width: "100%" }}
                    name="linkedIn"
                    type="text"
                    placeholder="Enter linkedin Address"
                    />
                    </FormGroup>
                    </Col>
                    <FormGroup
            className="form-row mb-3 input-text-style"
            style={{ marginRight: 20, width: "100%" }}
          >
            <label  className="mb-2">
              Additional Information :
            </label>

            <textarea
              style={{ width: "100%", height: "168px" }}
              name="addInfo"
              type="text"
              id="addInfo"
              className="form-styles"
            //   onChange={(event) => handleInputChange(index, event)}
            //   value={inputField.addInfo}
            />
          </FormGroup>
                   </Row>
                </Form>
                <Button
                type="submit"
                variant='container'
                className='btn-primary '
                >
                    Next
                </Button>
                </Card>
            </Container>

            </>
         
         )}
    </Formik>
    // <div>OnlineProfile</div>
  )
}
export default OnlineProfile