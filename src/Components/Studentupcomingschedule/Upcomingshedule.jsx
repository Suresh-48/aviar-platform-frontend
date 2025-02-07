import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { Tabs, Tab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../Dashboard/css/Studentdashboard.css';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { FaChevronLeft } from 'react-icons/fa'
import { FaBeer } from 'react-icons/fa'

const theme = createTheme({
  palette: {
    primary: {
      light: "#717174",
      main: "#717174",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Upcomingschedule = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleIcon = () => {
    setIconVisible(!iconVisible); // Toggle the visibility of the icon
  };

  // const dropdownRef = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Container className="pt-3 mb-3">
        <div className="create-course-button">
      
          <h3 className="course-title"></h3>
          <div className="mt-2">
            <FontAwesomeIcon icon={faPlus} size="lg" className="mx-1" />
          </div>
        </div>

        <div>
          <Tabs
            value={value}
            indicatorColor="primary"
            onChange={handleChange}
            variant="fullWidth"
            aria-label="course schedule tabs"
          >
            <Tab
              label={
                <Row>
                  <Col>
                    <p className="tab-title text-dark">Upcoming Schedule</p>
                  </Col>
                </Row>
              }
              style={{ width: "33.3%" }}
            />
            <Tab
              label={
                <Row>
                  <Col>
                    <p className="tab-title text-dark">Complete Schedule</p>
                  </Col>
                </Row>
              }
              style={{ width: "33.3%" }}
            />
          </Tabs>
          <hr />

          {value === 0 && (
            <div>
              <h5>Upcoming shedule</h5>
              <Table striped bordered hover className="student-table" responsive>
                <thead >
                  <tr className="viewRow">
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>S.No</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Date</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Schedule Time</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Course Name</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Lesson Name</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Duration (in Hour)</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="colspan-data-alignment">
                      <h6 className="d-flex justify-content-center">No upcoming schedule</h6>
                    </td>
                  </tr>
                </tbody>
                <DropdownButton>
                      <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item ></Dropdown.Item>
        <Dropdown.Item ></Dropdown.Item>
      </DropdownButton>
      
              </Table>
            </div>
          )}

          {value === 1 && (
            <div>
              <h5>Complete schedule</h5>
              <Table striped bordered hover className="student-table" responsive>
                <thead >
                  <tr className="viewRow">
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>S.No</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Date</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Schedule Time</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Course Name</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Lesson Name</th>
                    <th className="blue-header"style={{backgroundColor:"darkBlue",color:"white"}}>Duration (in Hour)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="colspan-data-alignment">
                      <h6 className="d-flex justify-content-center">No complete schedule</h6>
                      
                    </td>
                  </tr>
                </tbody>
                <DropdownButton>
                      <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item ></Dropdown.Item>
        <Dropdown.Item ></Dropdown.Item>
      </DropdownButton>
              </Table>
            </div>
          )}
      
        </div>
      
      </Container>
    </ThemeProvider>
    
  );
};

export default Upcomingschedule;