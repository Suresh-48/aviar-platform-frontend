import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { Container } from "react-bootstrap";
// import Api from "../../Api";
// import { Link, useHistory } from "react-router-dom";

// Component
import  tableIcons  from "../Core/TableIcons";
// import Loader from "../Core/Loader";
import { toast } from "react-toastify";

function ActiveCourses(props) {
  const [studentId, setstudentId] = useState(props?.match?.params?.id);
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
//   const history = useHistory();

  // Style
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

  //logout
//   const logout = () => {
//     setTimeout(() => {
//       localStorage.clear(history.push("/kharpi"));
//       window.location.reload();
//     }, 2000);
//   };

  const columns = [
    {
      title: "S.No",
      width: "10%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Category Name",
      field: "courseId.category.name",
    },
    {
      title: "Course Name",
      field: "courseId.name",
      render: (rowData) => (
        <Link
          className="linkColor"
          to={{
            pathname: `/course/detail/${rowData.courseId?.aliasName}`,
            state: { courseId: rowData.id },
          }}
        >
          {rowData.courseId.name}
        </Link>
      ),
    },
    {
      title: "Start Date",
      field: "courseLessonId.lessonName",
    },
    {
      title: "Weakly On",
      field: "scheduleLesson.lessonDate",
    },
    {
      title: "Start Time",
      render: (rowData) => `${rowData?.scored + " %"}`,
    },
    {
        title: "End Time",
        render: (rowData) => `${rowData?.scored + " %"}`,
      },
  ];

//   const getStudentMarks = () => {
//     Api.get(`api/v1/quizSchedule/student/completed/quiz/result`, {
//       params: {
//         studentId: studentId,
//         userId: userId,
//       },
//     })
//       .then((response) => {
//         const data = response.data.getAll;
//         setData(data);
//         setisLoading(false);
//       })
//       .catch((error) => {
//         const errorStatus = error?.response?.status;
//         if (errorStatus === 401) {
//           logout();
//           toast.error("Session Timeout");
//         }
//       });
//   };

//   useEffect(() => {
//     getStudentMarks();
//   }, []);

  return (
    <div>
      {/* {isLoading ? ( */}
        {/* <Loader /> */}
      {/* ) : ( */}
        <Container className="mb-2">
          <div>
            <h4 className="py-3">Active Enroll Course List</h4>
          </div>
          <div className="material-table-responsive">
            <ThemeProvider theme={tableTheme}>
              <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={data}
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
                localization={{
                  body: {
                    emptyDataSourceMessage: "No Records To Display",
                  },
                }}
              />
            </ThemeProvider>
          </div>
        </Container>
      {/* )} */}
    </div>
  );
}
export default ActiveCourses;
