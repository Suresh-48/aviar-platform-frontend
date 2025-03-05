import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
// import Loader from "../Core/Loader";
import tableIcons  from "../Core/TableIcons";// Ensure this path is correct


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
  const [category, setCategory] = useState([]);
  const userId = localStorage.getItem("userId");

  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Category Name",
      field: "name",
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
    // courseCategoryData();
  }, []);

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
      {/* )} */}
    </div>
  );
}

export default CourseCategory;
