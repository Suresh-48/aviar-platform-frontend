import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { Container,Modal,FormControl,Button,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faX } from "@fortawesome/free-solid-svg-icons";
// Material Table Icons
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import Label from "../Core/Label";

// Material Table Styles
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

// Component
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu";
import tableIcons from "../Core/TableIcons";

function CourseLesson(props) {
  const [data, setData] = useState([]);
  const[selectedLesson,setSelectedLesson] = useState(null);
  const[editLessonDetails,setEditLessonDetails] = useState(false);
  const[editLessonName,setEditLessonName]= useState(null);
  const [courseDetail, setCourseDetail] = useState({});
  const [courseId, setCourseId] = useState(props?.location?.state?.courseId);
  const [isLoading, setIsLoading] = useState(true);
  const[editActualAmount,setEditActualAmount] =useState(null);
 const[editDiscountAmount,setEditDiscountAmount] =useState(null);
 const[editDescription,setEditDescription] =useState(null);
 const[deleteLessonName,setDeleteLessonName] =useState(null);
 const[deleteLessons,setDeleteLessons] = useState(false);
 const[editDuration,setEditDuration]=useState(null);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleClose = () => {
    setEditLessonDetails(false);
  }
  const handleCloseClick = () => {
    setDeleteLessons(false);
  }
  // Column Heading
  const columns = [
    {
      title: "Lesson",
      width: "5%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
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
      render: (rowData) => `1 hour`, // You can replace this with actual duration if available
    },
  ];



  // Fetch Course Lesson List
  const getCourseLessonDetail =()=>{
  
      Api.get("api/v1/courseLesson/lessonlist",{params: {courseId:courseId, userId:userId}})
    .then((response)=>{
      console.log("response",response.data.lessonList);
   
      const lessonList = response.data.lessonList;
      data.sort((a, b) => (a.lessonNumber > b.lessonNumber ? 1 : -1));
      setData(lessonList);
   
    })

    }
      // Fetch Course Detail
  const getCourseDetail = () => {
     Api.get(`api/v1/course/${courseId}`, {
        headers: { userId: userId },
      })
      .then((response) => {
        setCourseDetail(response.data.data); // Update state with the fetched data
      })
      // .catch((error) => {
      //   console.error("Error fetching course detail:", error);
      //   toast.error("Failed to fetch course details"); // Show error message
      // });
  };
const handleCancel=()=>{
  setEditLessonName('')
  setEditActualAmount('')
  setEditDiscountAmount('')
}


  useEffect(() => {
    getCourseLessonDetail();
    getCourseDetail();
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
        // toast.success("Lesson updated successfully");
        setEditLessonDetails(false);
        getCourseLessonDetail(); // Refresh lesson list
      })
      // .catch((error) => {
      //   console.error("Error updating lesson:", error);
      //   toast.error("Failed to update lesson");
      // });
      console.log("res",res)
  };
  const deleteLessonDetails = () => {
    if (!selectedLesson) return;
      Api.delete(`api/v1/courseLesson/${selectedLesson.id}`, {
      headers:{ userId: userId},
      lessonName:deleteLessonName,
      
      })
      .then((res) => {
        // toast.success("Lesson updated successfully");
        setDeleteLessons(false);
        getCourseLessonDetail(); // Refresh lesson list
      })
      // .catch((error) => {
      //   console.error("Error updating lesson:", error);
      //   toast.error("Failed to update lesson");
      // });
      console.log("res",res)
  };
  // const editLesson =()=>{

  //   if (!selectedLesson) return;
  //   axios.patch(`http://localhost:3000/api/v1/courseLesson/${selectedLesson.id}`,{
  //     // name: editLessonName,
  //     lessonName:editLessonName,
  //     actualName:editActualAmount,
  //     discountAmount:editDiscountAmount,
  //     userId: userId,
  //   })
  //     // console.log(editCategoryName)
  //     .then((res) => {
   
  //       setEditLessonDetails(false); // Close the modal
  //       getCourseDetail();// Refresh data
  //       //  toast.success(res.data); 
  //     })
  //     console.log("res",res)
  //     // .catch((error) => {
  //     //   console.error("Error updating category", error);
  //     // });
  //   }
  // Style
  const tableTheme = createTheme({
    overrides: {
      MuiTableRow: {
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
  });

  return (
    <div>
    <Container className="mt-1">
      <CourseSideMenu courseId={courseId} />
      <div className="row edit-course-lesson-style">
        <ThemeProvider theme={tableTheme}>
          {/* {isLoading ? (
            <Loader />
          ) : ( */}
            <div className="mb-3">
              <div className="mt-2 py-3">
                <h4>Lessons</h4>
              </div>
              <div className="material-table-responsive">
                <MaterialTable
                  style={{ width: "100%" }}
                  icons={tableIcons}
                  title={courseDetail?.name || "Lessons"}
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
                            courseId: courseId,
                            courseName: courseDetail?.name,
                          },
                        });
                      },
                    },
                    // {
                    //   icon: () => <Edit style={{ color: "#1458E0" }} />,
                    //   tooltip: "Edit Lesson",
                    //   onClick: (event, rowData) => {
                    //     navigate(`/course/lesson/edit/${rowData.id}`, {
                    //       state: rowData,
                    //     });
                    //   },
                    // },
                  {
                    icon: () => <FontAwesomeIcon icon={faPen} style={{ color: "#03358c" }} size="sm" />,
                    tooltip: 'Edit',
                      // onClick: (event, rowData) => {
                      //   navigate("/admin/course/lesson/edit/${rowData.id}", {
                      //     state: rowData,
                      //   });
                      // },
                      onClick: (event, rowData) => {
                        setSelectedLesson(rowData);
                        setEditLessonName(rowData.lessonName);
                        setEditActualAmount(rowData.lessonActualAmount);
                        setEditDiscountAmount(rowData.lessonDiscountAmount);
                        setEditDescription(rowData.description);
                        setEditDuration(rowData.duration);
                        setEditLessonDetails(true);
                      },
                 
                  },
                  {
                    icon: () => <FontAwesomeIcon icon={faTrash} style={{ color: "#03358c" }} size="sm" />,
                     
                    tooltip: 'Delete',
                      onClick:(event, rowData) => {
                        setSelectedLesson(rowData);
                        setDeleteLessons(true);
                        setDeleteLessonName(rowData.deleteLessonName);
                       
                        // setselectedLesson(rowData);
                        // setDeleteCategoryName(rowData.name);
                      }}

                  ]}
                          // actions={[
                         
                          //         ]}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "No Lessons Are Created",
                    },
                  }}
                  // editable={{
                  //   onRowDelete: (selectedRow) =>
                  //     new Promise((resolve, reject) => {
                  //       deleteLesson(selectedRow, resolve);
                  //     }),
                  // }}
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
          {/* // )} */}
        </ThemeProvider>
      </div>
    </Container>
       <Modal show={editLessonDetails} centered onHide={() => handleModal()}>
            <Modal.Body id="contained-modal-title-vcenter">
              <div className="container py-3">
                <FontAwesomeIcon icon={faX} className="float-end" onClick={handleClose}/>
                <div className="row flex-direction-row">
                  <h3 className=" d-flex justify-content-center align-self-center ">
                    Edit Lesson Detail
                  </h3>
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
                      <br />
                  {/* <Label notify={true}>Description</Label>
                  <FormControl
                    type="text"
                    placeholder="Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  /> */}
                    <br />
                  {/* <Label notify={true}>Duration</Label>
                  <FormControl
                    type="text"
                    placeholder="Duration"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                  /> */}
                  <div className="mt-3 mb-3">
    
                    <Button
                      variant="contained"
                      onClick={() => { editLesson() }}
                      style={{
                        backgroundColor: "gray",
                        color: "#fff",
                        borderRadius: "4px",
                        marginLeft: "260px",
    
                      }}
                      className="float"
                    >
                      Update
                    </Button>
    
                    <Button
                      variant="contained"
                      onClick={handleCancel}
                      style={{
                        backgroundColor: "gray",
                        color: "gray",
                        borderRadius: "4px",
                      }}
                      className="float-end"
                    >
                      Cancel
                    </Button>
                    
    
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={deleteLessons} centered onHide={() => handleModal()}>
        <Modal.Body id="contained-modal-title-vcenter">
          <div className="container py-3">
            <FontAwesomeIcon icon={faX} className="float-end" onClick={handleCloseClick} />
            <div className="row flex-direction-row">
              <h3 className=" d-flex justify-content-center align-self-center ">
                Delete Lesson
              </h3>
            </div>

            <div className="mt-3 mb-3">
            <FormControl
                type="text"
                placeholder="Lesson Name"
                value={deleteLessonName}
                onChange={(e) => setDeleteLessonName(e.target.value)}
              />
              <br/>
              <Button
                variant="contained"
                onClick={() => { deleteLessonDetails() }}
                style={{
                  backgroundColor: "gray",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                className="create-category-button-style"
              >
                Delete
              </Button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
          </div>
  );
}

export default CourseLesson;