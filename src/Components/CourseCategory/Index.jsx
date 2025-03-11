import React, { useState, useEffect } from "react";
import { Container, Modal, Col, FormControl, Form, Row, } from "react-bootstrap";
import MaterialTable from "material-table";
import Button from '@mui/material/Button';
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
// import Loader from "../Core/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import tableIcons from "../Core/TableIcons";// Ensure this path is correct
import Label from "../Core/Label";


const tableTheme = createTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(224, 224, 224, 1) !important",
        },
      },
    },
  },
});



function CourseCategory(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [category, setCategory] = useState([]);
  const userId = localStorage.getItem("userId");
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState(null);
  const[deleteCategoryName,setDeleteCategoryName] = useState(null);
  
  
  const handleCloseClick = () => {
    setEditCategory(false);
  }
  const handleClose = () => {
    setDeleteCategory(false);
  }
  const handleCancel = () => {
    setEditCategoryName(''); 
    console.log("values",selectedCategory.name)// Reset input to original value
  };
  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Category Name",
      field: "name", // db column mapping
    },
    {
      title: "Created By",
      render: (rowData) => (rowData.createdBy ? `${rowData.createdBy.firstName} ${rowData.createdBy.lastName}` : null),
    },
    {
      title: "Created At",
      field: "createdAt",
    },
 

  ];


  useEffect(() => {
    getCourseCategory()
    // editCourseCategory()
  }, []);
  const getCourseCategory = () => {
    axios.get("http://localhost:3000/api/v1/category")
      .then((response) => {

        let data = response.data.data;
        console.log("response", response.data.data)
        setCategory(data);
      })
  }

  
  const editCourseCategory = () => {
    if (!selectedCategory) return;
    axios.patch(`http://localhost:3000/api/v1/category/${selectedCategory.id}`,{
      name: editCategoryName,
      userId: userId,
    })
      // console.log(editCategoryName)
      .then((res) => {
        console.log("Updated Successfullys", res);
        setEditCategory(false); // Close the modal
        getCourseCategory();// Refresh data
         toast.success(res.data); 
      })
      .catch((error) => {
        console.error("Error updating category", error);
      });
  };

  const deleteCourseCategory = () => {
    if (!selectedCategory) return;
    console.log("user id......",userId)
    axios.delete(`http://localhost:3000/api/v1/category/${selectedCategory.id}`, {
      headers: { userId: userId }, // Send userId in headers
    })
      .then((res) => {
        setDeleteCategory(false); // Close the modal
        getCourseCategory(); // Refresh data
        console.log("res", res)
      })
  }
  // const deleteCourseCategory = () => {
  //   if (!selectedCategory) return;
  //   console.log("user id......", userId);
  
  //   axios.delete(`http://localhost:3000/api/v1/category/${selectedCategory.id}`, {
  //     headers: { userId: userId }, // Send userId in headers
  //   })
  //     .then((res) => {
  //       setEditCategory(false); // Close the modal
  //       getCourseCategory(); // Refresh data
  //       console.log("res", res);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting category:", error);
  //     });
  // };
  
  return (
    <div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}

      <Container className="mb-5">
        <div className="py-3">
          <h5>Course Category</h5>
        </div>
        <ThemeProvider theme={tableTheme}>
          <div className="material-table-responsive">
            <MaterialTable
              icons={tableIcons}
              data={category}
              columns={columns}
              actions={[
                {
                  icon: () => <FontAwesomeIcon icon={faPen} style={{ color: "#03358c" }} size="sm" />,
                  tooltip: 'Edit',
                  onClick: (event, rowData) => {
                    setSelectedCategory(rowData);
                    setEditCategoryName(rowData.name);
                    setEditCategory(true);
                  }
                },
                {
                  icon: () => <FontAwesomeIcon icon={faTrash} style={{ color: "#03358c" }} size="sm"/>,
                   
                  tooltip: 'Delete',
                    onClick:(event, rowData) => {
                      setDeleteCategory(true);
                      setSelectedCategory(rowData);
                      setDeleteCategoryName(rowData.name);
                    }}
               
                ]}

              options={{
                actionsColumnIndex: -1,
                addRowPosition: "last",
                headerStyle: {
                  fontWeight: "bold",
                  backgroundColor: "#1d1464",
                  color: "white",
                  zIndex: 0,
                },
                showTitle: false,
              }}
            />
          </div>
        </ThemeProvider>
      </Container>
      <Modal show={editCategory} centered onHide={() => handleModal()}>
        <Modal.Body id="contained-modal-title-vcenter">
          <div className="container py-3">
            <FontAwesomeIcon icon={faX} className="float-end" onClick={handleCloseClick} />
            <div className="row flex-direction-row">
              <h3 className=" d-flex justify-content-center align-self-center ">
                Edit Course Category
              </h3>
            </div>
            <div className="mt-3">
              <Label notify={true}>Category Name</Label>
              <FormControl
                type="text"
                placeholder="Category Name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />

              <br />
              <div className="mt-3 mb-3">

                <Button
                  variant="contained"
                  onClick={() => { editCourseCategory() }}
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
      <Modal show={deleteCategory} centered onHide={() => handleModal()}>
        <Modal.Body id="contained-modal-title-vcenter">
          <div className="container py-3">
            <FontAwesomeIcon icon={faX} className="float-end" onClick={handleCloseClick} />
            <div className="row flex-direction-row">
              <h3 className=" d-flex justify-content-center align-self-center ">
                Delete Course Category
              </h3>
            </div>

            <div className="mt-3 mb-3">
            <FormControl
                type="text"
                placeholder="Category Name"
                value={deleteCategoryName}
                onChange={(e) => setDeleteCategoryName(e.target.value)}
              />
              <br/>
              <Button
                variant="contained"
                onClick={() => { deleteCourseCategory() }}
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
      {/* )} */}
    </div>
  );
}

export default CourseCategory;
