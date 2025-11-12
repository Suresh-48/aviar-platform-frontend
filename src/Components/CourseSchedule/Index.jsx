import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment-timezone";

// Material Table Icons
import AddBox from "@mui/icons-material/AddBox";
import Edit from "@mui/icons-material/Edit";

// Component
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu";
import tableIcons  from "../core/TableIcons.jsx";

// Api
import Api from "../../Api";

const tableTheme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(224, 224, 224, 1) !important",
          },
        },
      },
    },
  },
});

function CourseSchedule() {
  const [data, setData] = useState([]);
  const [courseDetail, setCourseDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get courseId from location state
  const [courseId, setCourseId] = useState(location.state?.courseId);

  // Column Heading
  const columns = [
    {
      title: "S.No",
      render: (rowData) => rowData?.tableData?.id + 1,
      cellStyle: { width: 80 },
    },
    {
      title: "Weekly On",
      field: "weeklyOn",
      cellStyle: { width: 135 },
    },
    {
      title: "Start Date",
      field: "startDate",
      cellStyle: { width: 165 },
    },
    {
      title: "Start Time",
      field: "startTime",
      cellStyle: { width: 120 },
    },
    {
      title: "End Time",
      field: "endTime",
      cellStyle: { width: 120 },
    },
    {
      title: "Maximum Enroll Count",
      field: "totalStudentEnrolled",
      cellStyle: { width: 145 },
    },
    {
      title: "Teacher Assigned",
      render: (rowData) =>
        rowData.teacherId
          ? `${
              rowData?.teacherId?.firstName + " " + rowData?.teacherId?.lastName
            }`
          : "Not Scheduled",
      cellStyle: { width: 200 },
    },
  ];

  // Log out
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Get course schedule
  const courseSchedule = () => {
    const userId = localStorage.getItem("userId");
    if (!courseId) {
      setIsLoading(false);
      return;
    }

    Api.get("/api/v1/courseSchedule/course/list", {
      params: {
        courseId: courseId,
        userId: userId,
      },
    })
      .then((res) => {
        const list = res.data.courseList;
        setData(list);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
        setIsLoading(false);
      });
  };

  // Get course detail
  const getCourseDetail = () => {
    const userId = localStorage.getItem("userId");
    if (!courseId) return;

    Api.get(`api/v1/course/${courseId}`, { 
      headers: { userId: userId } 
    })
      .then((response) => {
        const courseDetail = response.data.data;
        setCourseDetail(courseDetail);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  useEffect(() => {
    if (courseId) {
      courseSchedule();
      getCourseDetail();
    } else {
      setIsLoading(false);
    }
  }, [courseId]);

  // Delete Course Schedule
  const deleteCourseSchedule = (data, reload) => {
    const date = Date.now();
    const cTime = moment(date).tz("America/Chicago").format("LT");
    const cDate = moment(date).tz("America/Chicago").format("ll");
    const userId = localStorage.getItem("userId");

    Api.delete(`api/v1/courseSchedule/`, {
      params: {
        scheduleId: data.id,
        courseId: courseId,
        currentDate: cDate,
        currentTime: cTime,
        userId: userId,
      },
    })
      .then((res) => {
        courseSchedule();
        reload();
        toast.success("Schedule deleted successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
            reload();
          }
          reload();
          toast.error(error.response.data.message || "Failed to delete schedule");
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  return (
    <Container className="mt-1">
      <CourseSideMenu courseId={courseId} />
      <div className="row">
        <ThemeProvider theme={tableTheme}>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="edit-course-lesson-style mb-3">
              <div className="mt-2 py-3">
                <h4>Schedules</h4>
                {courseDetail?.name && (
                  <h6 className="text-muted">Course: {courseDetail.name}</h6>
                )}
              </div>
              <div className="material-table-responsive">
                <MaterialTable
                  style={{ width: "100%" }}
                  icons={tableIcons}
                  title={data?.length === 0 ? "" : data[0]?.courseId?.name}
                  data={data}
                  columns={columns}
                  actions={[
                    {
                      icon: () => <AddBox style={{ color: "#1d1464" }} />,
                      tooltip: "Add Schedule",
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        navigate("/admin/course/schedule/add", {
                          state: {
                            courseId: courseId,
                            courseName: courseDetail?.name,
                          },
                        });
                      },
                    },
                    {
                      icon: () => <Edit style={{ color: "#1458e0" }} />,
                      tooltip: "Edit Schedule",
                      onClick: (event, rowData) => {
                        navigate("/course/schedule/update", { 
                          state: rowData 
                        });
                      },
                    },
                  ]}
                  editable={{
                    onRowDelete: (selectedRow) =>
                      new Promise((resolve, reject) => {
                        deleteCourseSchedule(selectedRow, resolve);
                      }),
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "No schedules found. Click the + button to add a new schedule.",
                    },
                    toolbar: {
                      searchTooltip: "Search",
                      searchPlaceholder: "Search schedules...",
                    },
                  }}
                  options={{
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    headerStyle: {
                      fontWeight: "bold",
                      backgroundColor: "#1d1464",
                      color: "white",
                      zIndex: 0,
                    },
                    pageSize: 10,
                    pageSizeOptions: [5, 10, 20],
                    padding: "dense",
                    sorting: true,
                    search: true,
                    filtering: false,
                    showTitle: true,
                    draggable: false,
                  }}
                />
              </div>
            </div>
          )}
        </ThemeProvider>
      </div>
    </Container>
  );
}

export default CourseSchedule;