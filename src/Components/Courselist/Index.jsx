import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Collapse,
  Button,
  Modal,
} from "react-bootstrap";
import { Tab, Tabs } from "@mui/material";
import ReactPaginate from "react-paginate";
import { createTheme, ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/CourseList.css";
import axios from "axios";

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
  const navigate = useNavigate();



  useEffect(()=>{
    getPublishCourse();
    getDraftCourse();
  },[]);

  const getPublishCourse = () => {
    const userId = localStorage.getItem("userId");
    axios.get("http://localhost:3000/api/v1/course/publish", { headers: { userId: userId } })
      .then((res) => {
        const data = res?.data?.data?.data;  
        setPublish(data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const getDraftCourse = () => {
    const userId = localStorage.getItem("userId");
    axios.get("http://localhost:3000/api/v1/course/Draft", { headers: { userId: userId } })
      .then((res) => {
        const data = res.data.data.data;   
        setDraft(data);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

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
            <h3 className="course-title">Courses</h3>
            <div className="mt-2">
              <Button
                // className="create-button-style py-1 Kharpi-save-btn"
                variant="primary"
                onClick={() => navigate("/admin/course/add")}
              >
                <FontAwesomeIcon icon={faPlus} size="lg" className="mx-1" />{" "}
                Create Course
              </Button>
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
                      <p className="tab-title">Published </p>
                    </Col>
                    <Col className="tab-count-style">
                      <p className="tab-count">{publish.length}</p>
                    </Col>
                  </Row>
                }
                style={{ width: "33.3%" }}
                value={0}
              />
              <Tab
                label={
                  <Row>
                    <Col>
                      <p className="tab-title">Drafted </p>
                    </Col>
                    <Col className="tab-count-style">
                      <p className="tab-count">{draft.length}</p>
                    </Col>
                  </Row>
                }
                style={{ width: "33.3%" }}
                value={1}
              />
              <Tab
                label={
                  <Row>
                    <Col>
                      <p className="tab-title">Archive</p>
                    </Col>
                    <Col className="tab-count-style">
                      <p className="tab-count">{archive.length}</p>
                    </Col>
                  </Row>
                }
                style={{ width: "33.3%" }}
                value={2}
              />
            </Tabs>
            <hr />

            {value === 0 && (
              <div>
                {publish.length > 0 ? (
                  <Row className="mt-3">
                    {publishCourses.map((course) => (
                      <Col xs={12} sm={6} md={6} lg={4} key={course.id} style={{ marginTop: 10 }}>
                        <Card className="card-height-style">
                          {console.log("ppp2ppppp......", course)}
                          <div className="image-content">
                            <img
                              className="image-heigh"
                              src={course.imageUrl || "https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"}
                              alt="Course"
                              width={"100%"}
                              height={"100%"}
                            />
                            <div className="top-right">
                              <FontAwesomeIcon
                                icon={faEllipsisV}
                                size="lg"
                                color={"white"}
                                onClick={() => {
                                  setOpen(!open);
                                  setCardId(course.id);
                                }}
                                className="font-awesome-point"
                              />
                              {cardId === course.id && (
                                <Collapse in={open} className="collapse-show-text-width">
                                  <div className="collapse-style">
                                    <NavLink
                                      to={"/admin/course/detail"}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      View
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to={"/admin/course/edit/:id"}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      Edit
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to="#"
                                      className="navigate-edit-text-NavLink"
                                      onClick={() => setLessonShow(true)}
                                    >
                                      Archive
                                    </NavLink>
                                  </div>
                                </Collapse>
                              )}
                            </div>
                          </div>
                          <Card.Body className="card-body-alignments">
                            <Card.Title className="truncate-text">
                              {course.name}
                            </Card.Title>
                            <Card.Text>
                              <p className="ellipsis-text">{course.description}</p>
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <div className="row card-footer-header">
                              <Col xs={12} sm={12} md={5}>
                                <div className="footer-price-style">
                                  <p className="discount-amount-text">₹ 0</p>
                                  {/* <p className="actual-amount-text mt-3">$ 0</p> */}
                                </div>
                              </Col>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                    <div className="pagination-width">
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
                        pageNavLinkClassName={"page-NavLink"}
                        previousClassName={"page-item"}
                        previousNavLinkClassName={"page-NavLink"}
                        nextClassName={"page-item"}
                        nextNavLinkClassName={"page-NavLink"}
                      />
                    </div>
                  </Row>
                ) : (
                  <div>
                    <p className="no-record-position-style">No Record Found</p>
                  </div>
                )}
              </div>
            )}

            {value === 1 && (
              <div>
                {draft.length > 0 ? (
                  <Row className="mt-3">
                    {draftCourses.map((course) => (
                      <Col xs={12} sm={6} md={6} lg={4} key={course.id} style={{ marginTop: 10 }}>
                        <Card className="card-height-style">
                          <div className="image-content">
                            <img
                              className="image-heigh"
                              src={course.imageUrl || "https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"}
                              alt="Course"
                              width={"100%"}
                              height={"100%"}
                            />
                            {console.log("course//////",course.id)}
                            <div className="top-right">
                              <FontAwesomeIcon
                                icon={faEllipsisV}
                                size="lg"
                                color={"white"}
                                onClick={() => {
                                  setOpen(!open);
                                  setCardId(course.id);
                                }}
                                className="font-awesome-point"
                              />
                              {cardId === course.id && (
                                <Collapse in={open} className="collapse-show-text-width">
                                  <div className="collapse-style">
                                    <NavLink
                                      to={`/admin/course/detail/${course.id}`}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      View
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to={"/admin/course/edit/:id"}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      Edit
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to="#"
                                      className="navigate-edit-text-NavLink"
                                      onClick={() => setLessonShow(true)}
                                    >
                                      Publish
                                    </NavLink>
                                  </div>
                                </Collapse>
                              )}
                            </div>
                          </div>
                          <Card.Body className="card-body-alignments">
                            <Card.Title className="truncate-text">
                              {course.name}
                            </Card.Title>
                            <Card.Text>
                              <p className="ellipsis-text">{course.description}</p>
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <div className="row card-footer-header">
                              <Col xs={12} sm={12} md={5}>
                                <div className="footer-price-style">
                                  <p className="discount-amount-text">₹ 0</p>
                                  <p className="actual-amount-text mt-3">₹ 0</p>
                                </div>
                              </Col>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                    <div className="pagination-width">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(draft.length / postsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handleDraftPageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageNavLinkClassName={"page-NavLink"}
                        previousClassName={"page-item"}
                        previousNavLinkClassName={"page-NavLink"}
                        nextClassName={"page-item"}
                        nextNavLinkClassName={"page-NavLink"}
                      />
                    </div>
                  </Row>
                ) : (
                  <div>
                    <p className="no-record-position-style">No Record Found</p>
                  </div>
                )}
              </div>
            )}

            {value === 2 && (
              <div>
                {archive.length > 0 ? (
                  <Row className="mt-3">
                    {archiveCourses.map((course) => (
                      <Col xs={12} sm={6} md={6} lg={4} key={course.id} style={{ marginTop: 10 }}>
                        <Card className="card-height-style">
                          <div className="image-content">
                            <img
                              className="image-heigh"
                              src={course.imageUrl || "https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest?cb=20170601005615"}
                              alt="Course"
                              width={"100%"}
                              height={"100%"}
                            />
                            <div className="top-right">
                              <FontAwesomeIcon
                                icon={faEllipsisV}
                                size="lg"
                                color={"white"}
                                onClick={() => {
                                  setOpen(!open);
                                  setCardId(course.id);
                                }}
                                className="font-awesome-point"
                              />
                              {cardId === course.id && (
                                <Collapse in={open} className="collapse-show-text-width">
                                  <div className="collapse-style">
                                    <NavLink
                                      to={"/admin/course/detail/"}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      View
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to={`/course/edit/${course.id}`}
                                      className="navigate-edit-text-NavLink"
                                    >
                                      Edit
                                    </NavLink>
                                    <hr />
                                    <NavLink
                                      to="#"
                                      className="navigate-edit-text-NavLink"
                                      onClick={() => setLessonShow(true)}
                                    >
                                      Publish
                                    </NavLink>
                                  </div>
                                </Collapse>
                              )}
                            </div>
                          </div>
                          <Card.Body className="card-body-alignments">
                            <Card.Title className="truncate-text">
                              {course.name}
                            </Card.Title>
                            <Card.Text>
                              <p className="ellipsis-text">{course.description}</p>
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <div className="row card-footer-header">
                              <Col xs={12} sm={12} md={5}>
                                <div className="footer-price-style">
                                  <p className="discount-amount-text">₹ 0</p>
                                  <p className="actual-amount-text mt-3">₹ 0</p>
                                </div>
                              </Col>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                    <div className="pagination-width">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(archive.length / postsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handleArchivePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageNavLinkClassName={"page-NavLink"}
                        previousClassName={"page-item"}
                        previousNavLinkClassName={"page-NavLink"}
                        nextClassName={"page-item"}
                        nextNavLinkClassName={"page-NavLink"}
                      />
                    </div>
                  </Row>
                ) : (
                  <div>
                    <p className="no-record-position-style">No Record Found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Modal show={lessonShow} centered style={{ left: "2px" }}>
          <Row className="border-bottom-color m-0 py-3">
            <h5 className="filter-head-cls">Unable to Publish !</h5>
          </Row>
          <p className="px-5 pt-5 pb-4">
            Quiz and Homework are missing in some lesson. Please create quiz and
            homework in the lesson, Before publishing the course.
          </p>
          <div className="d-flex justify-content-center">
            <Modal.Footer>
              <Button
                className="px-4 mb-4 Kharpi-save-btn"
                onClick={() => setLessonShow(false)}
              >
                OK
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default CourseList;