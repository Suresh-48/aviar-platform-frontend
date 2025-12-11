import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import { Container, Row, Col, Button, Spinner, FormControl, Form, InputGroup, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Slider } from "@mui/material";
import Label from "../../components/core/Label";
import "../../css/AllCourseList.css";
import Select from "react-select";
import Api from "../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter } from "@fortawesome/free-solid-svg-icons";
import Loader from "../core/Loader";
import CourseCard from "../../components/core/CourseCard.jsx";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const AllCourseList = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [landingPageCategoryList, setLandingPageCategoryList] = useState(location?.state);
  const [courseList, setCourseList] = useState([]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState([0, 500]);
  const [spinner, setSpinner] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [courseDataList, setCourseDataList] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    getCategory();
    courseFilter();
  }, []);

  useEffect(() => {
    courseFilter(search);
  }, [search]);

  useEffect(() => {
    const lastPage = currentPage * postPerPage;
    const firstPage = lastPage - postPerPage;
    const courseDataList = courseList.slice(firstPage, lastPage);
    setCourseDataList(courseDataList);
  }, [currentPage, postPerPage, courseList]);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(courseList?.length / postPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [courseList, postPerPage]);
  console.log("bjbjbjj")

  const getCategory = () => {
    const userId = localStorage.getItem("userId");

    Api.get("api/v1/course/publish", {
      headers: {
        userId: userId,
      },
    })
      .then((res) => {
        const categoryData = res.data?.data?.data[0]?.category;

        // Set SELECTED category
        setCategory({
          value: categoryData.id,
          label: categoryData.name,
        });

        setFieldValue("category", {
          value: categoryData.id,
          label: categoryData.name,
        });

        setIsLoading(false);
        setSpinner(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };


  const courseFilter = (searchData) => {
    const userId = localStorage.getItem("userId");
    const filterData = landingPageCategoryList ? [landingPageCategoryList] : data;
    Api.post("api/v1/course/filter", {
      userId: userId,
      filter: filterData,
      range: range,
      search: searchData === undefined ? search : searchData,
      userId: userId,
    })
      .then((res) => {
        const data = res.data.data;
        const assending = data.sort((a, b) => a - b);
        setCourseList(assending);
        setIsLoading(false);
        setSpinner(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const handleChange = (e) => {
    setSearch(e);
  };

  const spinnerLoader = () => {
    setSpinner(!spinner);
  };

  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      // navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  const onSelected = (selectedList) => {
    setData(selectedList);
  };

  const onRemove = (selectedList) => {
    setData(selectedList);
  };

  const handlePageClick = (data) => {
    let selected = data.selected + 1;
    setCurrentPage(selected);
  };

  return (
    <div>
      {isLoading ? null : (
        <div className="ms-lg-4 search-col mt-3 mt-md-4">
          <h4 className="d-flex align-items-center">Courses</h4>
          <Form className="d-flex flex-column flex-md-row align-items-start align-items-md-center mt-2">
            <div className="w-100">
              <Form.Group className="search-col">
                <Label className="d-none d-md-block">Search By Course Name</Label>
                <FormControl
                  type="text"
                  name="name"
                  onChange={(e) => {
                    handleChange(e.target.value);
                    courseFilter(e.target.value);
                  }}
                  className="form-width w-100"
                  placeholder="Search By Course Name"
                />
              </Form.Group>
            </div>
            <div className="mt-2 mt-md-4 ms-0 ms-md-2">
              <InputGroup
                className="filter-ico"
                onClick={() => {
                  setSearchModalOpen(true);
                }}
              >
                <InputGroup.Text className="cursor-pointer">
                  <FontAwesomeIcon icon={faFilter} />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </Form>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Container fluid className="mt-0 mt-md-3">
          <Row>
            <Col className="d-flex flex-column mt-1 h-100 px-2 px-md-0">
              {isLoading === true ? (
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                  <Spinner animation="grow" variant="primary" />
                  <h4 className="mt-2 mt-md-0 ms-0 ms-md-3">Loading...</h4>
                </div>
              ) : courseDataList.length > 0 ? (
                <div className="w-100">
                  <Row className="mt-3 mx-0">
                    {courseDataList.map((course, index) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                        key={index}
                        className="mb-3 px-2"
                      >
                        <CourseCard
                          course={course}
                          onClick={spinnerLoader}
                          reload={courseFilter}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Row className="mt-3">
                    <div className="pagination-width overflow-auto">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageNumbers?.length}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex-wrap justify-content-center"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakLinkClassName={"page-link"}
                      />
                    </div>
                  </Row>
                  {spinner && (
                    <div className="spanner d-flex flex-column flex-md-row justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-3">
                      <Spinner animation="grow" variant="light" />
                      <h4 className="mt-2 mt-md-0 ms-0 ms-md-3 text-white">Loading...</h4>
                    </div>
                  )}
                </div>
              ) : (
                <div className="position-absolute top-50 start-50 translate-middle text-center center-alignment">
                  No Courses Available Here
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}

      {/* Modal Responsive Styles */}
      <Modal
        show={searchModalOpen}
        centered
        backdrop="static"
        className="filter-model"
        onHide={() => {
          setSearchModalOpen(false);
          setSearch("");
        }}
        size="md"
      >
        <Modal.Header closeButton className="border-bottom-0 p-3 p-md-4">
          <Modal.Title className="filter-head-cls fs-5 fs-md-4">
            Apply Filters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4 pt-0">
          <div className="d-block">
            <div className="mb-3 mb-md-4">
              <p className="filter-type-name mb-1">Category</p>
              <Select
                value={category}
                placeholder="Select Category"
                name="category"
                onChange={(e) => {
                  if (e.value === "No option") {
                    handleModal();
                  } else {
                    setFieldValue("category", e);
                    setCategory(e);
                  }
                }}
                options={[
                  {
                    value: "No option",
                    label: "No option",
                  },
                  ...(categoryList?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []),
                ]}
                className="basic-single"
                classNamePrefix="select"
              />
            </div>

            <div className="mb-3 mb-md-4">
              <p className="filter-type-name mb-1">Search by name</p>
              <div className="input-group">
                <input
                  type="text"
                  value={search}
                  className="form-control input-font-style"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    courseFilter(e.target.value);
                  }}
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="mb-4 mb-md-5">
              <p className="filter-type-name mb-1">Price Range</p>
              <div className="px-1 px-md-2">
                <Slider
                  className="range-clr"
                  getAriaLabel={() => "Price range"}
                  min={0}
                  max={1000}
                  value={range}
                  onChange={(event, newValue) => {
                    setRange(newValue);
                  }}
                  valueLabelDisplay="auto"
                />
              </div>
              <div className="slider-count d-flex justify-content-between m-0 mt-2">
                <p className="mb-0">${range[0]}</p>
                <p className="mb-0">${range[1]}</p>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-2 gap-sm-0 mt-3">
              <Button
                variant="danger"
                onClick={() => {
                  setSearch("");
                  setData([""]);
                  setRange([0, 500]);
                }}
                className="w-100 w-sm-auto"
              >
                Clear
              </Button>
              <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 w-100 w-sm-auto">
                <Button
                  className="Kharpi-cancel-btn"
                  variant="light"
                  onClick={() => {
                    setSearchModalOpen(false);
                    setSearch("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="Kharpi-save-btn"
                  onClick={() => {
                    courseFilter();
                    setSearchModalOpen(false);
                    setSearch("");
                  }}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllCourseList;