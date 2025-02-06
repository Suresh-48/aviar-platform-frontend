import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Collapse,
  Button,
  Modal,
  Table
} from "react-bootstrap";
import { Tab, Tabs } from "@mui/material";
import ReactPaginate from "react-paginate";
import { createTheme, ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// import { Link, useHistory } from "react-router-dom";
// import "../../css/CourseList.css";
import '../Dashboard/css/Studentdashboard.css'


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

const CourseList = () => {
  const [publish, setPublish] = useState([]);
  const [draft, setDraft] = useState([]);
  const [archive, setArchive] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [cardId, setCardId] = useState("");
  const [publishCurrentPage, setPublishCurrentPage] = useState(0);
  const [draftCurrentPage, setDraftCurrentPage] = useState(0);
  const [archiveCurrentPage, setArchiveCurrentPage] = useState(0);
  const [postsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [lessonShow, setLessonShow] = useState(false);
  // const history = useHistory();

  // Dummy data for demonstration
  useEffect(() => {
    setPublish([
      { id: 1, name: "Published Course 1", description: "Description 1", imageUrl: null },
      { id: 2, name: "Published Course 2", description: "Description 2", imageUrl: null },
    ]);
    setDraft([
      { id: 3, name: "Draft Course 1", description: "Description 3", imageUrl: null },
      { id: 4, name: "Draft Course 2", description: "Description 4", imageUrl: null },
    ]);
    setArchive([
      { id: 5, name: "Archived Course 1", description: "Description 5", imageUrl: null },
      { id: 6, name: "Archived Course 2", description: "Description 6", imageUrl: null },
    ]);
  }, []);

  const handlePublishPageClick = (data) => {
    setPublishCurrentPage(data.selected);
  };

  const handleDraftPageClick = (data) => {
    setDraftCurrentPage(data.selected);
  };

  const handleArchivePageClick = (data) => {
    setArchiveCurrentPage(data.selected);
  };

  const publishLastPage = (publishCurrentPage + 1) * postsPerPage;
  const publishFirstPage = publishLastPage - postsPerPage;
  const publishCourses = publish.slice(publishFirstPage, publishLastPage);

  const draftLastPage = (draftCurrentPage + 1) * postsPerPage;
  const draftFirstPage = draftLastPage - postsPerPage;
  const draftCourses = draft.slice(draftFirstPage, draftLastPage);

  const archiveLastPage = (archiveCurrentPage + 1) * postsPerPage;
  const archiveFirstPage = archiveLastPage - postsPerPage;
  const archiveCourses = archive.slice(archiveFirstPage, archiveLastPage);

  return (
    <ThemeProvider theme={theme}>
      <Container className="pt-3 mb-3">
        <div>
          <div className="create-course-button">
            <h3 className="course-title"></h3>
            <div className="mt-2">
              {/* <Button */}
                {/* // className="create-button-style py-1 Kharpi-save-btn" */}
                {/* // variant="primary" */}
                {/* // onClick={() => history.push("/course/add")} */}
              {/* > */}
                <FontAwesomeIcon icon={faPlus} size="lg" className="mx-1" />{" "}
                {/* Create Course */}
              {/* </Button> */}
            </div>
          </div>
</div>
          <div>
            <Tabs
              value={value}
              indicatorColor="primary"
              onChange={(event, newValue) => setValue(newValue)}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label={
                  <Row>
                    <Col>
                      <p className="tab-title text-dark">upcoming schedule </p>
                    </Col>
                  </Row>
                }
                style={{ width: "33.3%" }}
                // value={0}
              />
          
              <Tab
                label={
                  <Row>
                    <Col>
                      <p className="tab-title text-dark">COMPLETE SCHEDULE</p>
                    </Col>
                
                  </Row>
                }
                // style={{ width: "33.3%" }}
              />
            </Tabs>
            <hr />

            {value === 0 && ( 
              <div> 
            
                  <Row className="mt-3">
                    
                        
                    {/* <div className="pagination-width">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(publish.length / postsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePublishPageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                      />
                    </div> */}
                  </Row>
                {/* ) : ( */}
                  <div>
                  <Table striped bordered hover className="student-table" responsive>

                  <thead>
                  <tr className="viewRow">
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Schedule Time</th>
                    <th>Course Name</th>
                    
                    <th>Lesson Name</th>
                    <th>Duration (in Hour)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tr>
                      <td colSpan="8" className="colspan-data-alignment">
                        <h6 className="d-flex justify-content-center">No Records To Display</h6>
                      </td>
                    </tr>
                </Table>
                  </div>
              
              </div>
             )} 

             {value === 1 && (
              <div>
              <Row>
              <div>
              <Table striped bordered hover className="student-table" responsive>

<thead>
<tr className="viewRow ">
  <th>S.No</th>
  <th>Date</th>
  <th>Schedule Time</th>
  <th>Course Name</th>
  <th>Lesson Name</th>
  <th>Duration</th>
</tr>
</thead>
<tr>
    <td colSpan="8" className="colspan-data-alignment">
      <h6 className="d-flex justify-content-center">No Records To Display</h6>
    </td>
  </tr>
</Table>      
 </div>
                  </Row>
            
                  <div>
                    <p className="no-record-position-style">No Record Found</p>
                  </div>
                
              </div>
            )} 

         
          </div>
        {/* </div> */}

   
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;