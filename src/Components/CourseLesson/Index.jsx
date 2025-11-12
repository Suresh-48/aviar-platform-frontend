import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";
import { Container, Modal, FormControl, Button, Form } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faX } from "@fortawesome/free-solid-svg-icons";
// Material Table Icons
import AddBox from "@mui/icons-material/AddBox";
import Edit from "@mui/icons-material/Edit";
import Label from "../Core/Label";

// Material Table Styles
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

// Component
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu";
import tableIcons from "../Core/TableIcons";

function CourseLesson() {
  const { id } = useParams();
  const { courseID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editLessonDetails, setEditLessonDetails] = useState(false);
  const [editLessonName, setEditLessonName] = useState("");
  const [courseDetail, setCourseDetail] = useState({});
  
  // FIX: Get courseId from URL params first, then from location state
  const [courseId, setCourseId] = useState(courseID || location.state?.courseId);
  const [isLoading, setIsLoading] = useState(true);
  const [editActualAmount, setEditActualAmount] = useState("");
  const [editDiscountAmount, setEditDiscountAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteLessonName, setDeleteLessonName] = useState("");
  const [deleteLessons, setDeleteLessons] = useState(false);
  const [editDuration, setEditDuration] = useState("");
  const userId = localStorage.getItem("userId");

  const handleClose = () => {
    setEditLessonDetails(false);
  }

  const handleCloseClick = () => {
    setDeleteLessons(false);
  }

  // Column Heading
  console.log("courseID from URL:", courseID);
  console.log("courseId from state:", courseId);

  const columns = [
{
  title: "S.No",
  width: "5%",
  field: "tableIndex",
},
    {
      title: "Lesson Name",
      field: "lessonName",
    },
    {
      title: "Actual Amount",
      render: (rowData) =>
        rowData.lessonActualAmount ? (
          <p className="amount-text">{rowData.lessonActualAmount}</p>
        ) : (
          "-"
        ),
    },
    {
      title: "Discount Amount",
      render: (rowData) =>
        rowData.lessonDiscountAmount ? (
          <p>{rowData.lessonDiscountAmount}</p>
        ) : (
          "-"
        ),
    },
    {
      title: "Description",
      render: (rowData) => (
        <div
          className="descriptions-text-align"
          dangerouslySetInnerHTML={{ __html: rowData.description || "No description" }}
        ></div>
      ),
      cellStyle: {
        maxWidth: 420,
      },
    },
    {
      title: "Duration",
      render: (rowData) => `1 hour`,
    },
  ];

  // Fetch Course Lesson List - FIXED
  const getCourseLessonDetail = () => {
    if (!courseId) {
      console.error("No courseId available for fetching lessons");
      setIsLoading(false);
      return;
    }

  Api.get("api/v1/courseLesson/lessonlist", { 
  params: { 
    courseId: courseId, // Use the correct courseId
    userId: userId 
  } 
})
  .then((response) => {
    console.log("Lesson list response:", response.data.lessonList);
    const lessonList = response.data.lessonList;
    
    // First sort the lessons by lessonNumber
    const sortedLessons = lessonList.sort((a, b) => (a.lessonNumber > b.lessonNumber ? 1 : -1));
    
    // Then add tableIndex after sorting
    const lessonsWithIndex = sortedLessons.map((lesson, index) => ({
      ...lesson,
      tableIndex: index + 1
    }));
    
    setData(lessonsWithIndex);
    setIsLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching lessons:", error);
    setIsLoading(false);
    toast.error("Failed to fetch lessons");
  });
  }

  // Fetch Course Detail - FIXED
  const getCourseDetail = () => {
    if (!courseId) {
      console.error("No courseId available for fetching course details");
      return;
    }

    Api.get(`api/v1/course/${courseId}`, {
      headers: { userId: userId },
    })
      .then((response) => {
        setCourseDetail(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching course detail:", error);
        toast.error("Failed to fetch course details");
      });
  };

  const handleCancel = () => {
    setEditLessonName('');
    setEditActualAmount('');
    setEditDiscountAmount('');
  }

  useEffect(() => {
    // Update courseId when URL params change
    if (courseID) {
      setCourseId(courseID);
    }
  }, [courseID]);

  useEffect(() => {
    if (courseId) {
      getCourseLessonDetail();
      getCourseDetail();
    } else {
      setIsLoading(false);
    }
  }, [courseId, userId]);

  const editLesson = () => {
    if (!selectedLesson) return;
    
    Api.patch(`api/v1/courseLesson/${selectedLesson.id}`, {
      lessonName: editLessonName,
      lessonActualAmount: editActualAmount,
      lessonDiscountAmount: editDiscountAmount,
      description: editDescription,
      duration: editDuration,
      userId: userId,
    })
      .then((res) => {
        toast.success("Lesson updated successfully");
        setEditLessonDetails(false);
        getCourseLessonDetail();
      })
      .catch((error) => {
        console.error("Error updating lesson:", error);
        toast.error("Failed to update lesson");
      });
  };

  const deleteLessonDetails = () => {
    if (!selectedLesson) return;
    
    Api.delete(`api/v1/courseLesson/${selectedLesson.id}`, {
      headers: { userId: userId },
      data: { // FIX: Send data in the body, not as query params for DELETE
        lessonName: deleteLessonName,
      }
    })
      .then((res) => {
        toast.success("Lesson deleted successfully");
        setDeleteLessons(false);
        getCourseLessonDetail();
      })
      .catch((error) => {
        console.error("Error deleting lesson:", error);
        toast.error("Failed to delete lesson");
      });
  };

  // Logout function
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Style - FIXED for MUI v6
  const tableTheme = createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "rgba(224, 224, 224, 1) !important",
            },
            "&:nth-child(even)": {
              backgroundColor: "#f0f5f5",
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <Container className="mt-1">
        <CourseSideMenu courseID={courseID} />
        <div className="row edit-course-lesson-style">
          <ThemeProvider theme={tableTheme}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="mb-3">
                <div className="mt-2 py-3">
                  <h4>Lessons - {courseDetail?.name || "Course Lessons"}</h4>
                </div>
                <div className="material-table-responsive">
                  <MaterialTable
                    style={{ width: "100%" }}
                    icons={tableIcons}
                    title={""} // Remove duplicate title
                    data={data}
                    columns={columns}
                    actions={[
                      {
                        icon: () => <AddBox style={{ color: "#1d1464" }} />,
                        tooltip: "Add Lesson",
                        isFreeAction: true,
                        onClick: () => {
                          navigate("/admin/course/lesson/add", {
                            state: {
                              courseID: courseID, 
                              courseName: courseDetail?.name,
                            },
                          });
                        },
                      },
                      {
                        icon: () => <FontAwesomeIcon icon={faPen} style={{ color: "#03358c" }} size="sm" />,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                          console.log("Editing lesson:", rowData);
                          navigate(`/admin/course/lesson/edit/${rowData.id}`, {
                            state: {
                              lessonId: rowData.id,
                              lessonData: rowData,
                              courseID: courseID, // Use courseId
                            }
                          });
                        },
                      },
                      console.log("courseID ijk",courseID),
                      {
                        icon: () => <FontAwesomeIcon icon={faTrash} style={{ color: "#03358c" }} size="sm" />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                          setSelectedLesson(rowData);
                          setDeleteLessons(true);
                          setDeleteLessonName(rowData.lessonName || "");
                        }
                      }
                    ]}
                    localization={{
                      body: {
                        emptyDataSourceMessage: "No Lessons Are Created",
                      },
                    }}
                    options={{
                      actionsColumnIndex: -1,
                      addRowPosition: "last",
                      headerStyle: {
                        backgroundColor: "#1d1464",
                        color: "white",
                        fontWeight: "bold",
                        zIndex: 0,
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </ThemeProvider>
        </div>
      </Container>

      {/* Edit Modal */}
      <Modal show={editLessonDetails} centered onHide={handleClose}>
        <Modal.Body>
          <div className="container py-3">
            <FontAwesomeIcon icon={faX} className="float-end" onClick={handleClose} style={{cursor: "pointer"}} />
            <div className="row flex-direction-row">
              <h3 className="text-center">Edit Lesson Detail</h3>
            </div>
            <div className="mt-3">
              <Label notify={true}>Lesson Name</Label>
              <FormControl
                type="text"
                placeholder="Lesson Name"
                value={editLessonName}
                onChange={(e) => setEditLessonName(e.target.value)}
              />
              <br />
              <Label notify={true}>Actual Amount</Label>
              <FormControl
                type="text"
                placeholder="Actual Amount"
                value={editActualAmount}
                onChange={(e) => setEditActualAmount(e.target.value)}
              />
              <br />
              <Label notify={true}>Discount Amount</Label>
              <FormControl
                type="text"
                placeholder="Discount Amount"
                value={editDiscountAmount}
                onChange={(e) => setEditDiscountAmount(e.target.value)}
              />
              <div className="mt-3 mb-3">
                <Button
                  variant="contained"
                  onClick={editLesson}
                  style={{
                    backgroundColor: "gray",
                    color: "#fff",
                    borderRadius: "4px",
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  style={{
                    marginLeft: "10px",
                    borderRadius: "4px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={deleteLessons} centered onHide={handleCloseClick}>
        <Modal.Body>
          <div className="container py-3">
            <FontAwesomeIcon icon={faX} className="float-end" onClick={handleCloseClick} style={{cursor: "pointer"}} />
            <div className="row flex-direction-row">
              <h3 className="text-center">Delete Lesson</h3>
            </div>
            <div className="mt-3 mb-3">
              <p>Are you sure you want to delete "{deleteLessonName}"?</p>
              <Button
                variant="contained"
                color="error"
                onClick={deleteLessonDetails}
                style={{
                  borderRadius: "4px",
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseClick}
                style={{
                  marginLeft: "10px",
                  borderRadius: "4px",
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CourseLesson;