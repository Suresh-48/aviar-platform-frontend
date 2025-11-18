import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment-timezone";

// Material Table Icons
import AddBox from "@mui/icons-material/AddBox";
import Edit from "@mui/icons-material/Edit";

// Component
import Loader from "../core/Loader";
import CourseSideMenu from "../CourseSideMenu";
import tableIcons from "../core/TableIcons";

// Api
import Api from "../../Api";

function CourseSchedule() {
    const { courseID } = useParams();
  const [data, setData] = useState([]);
  const [courseDetail, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Get courseId from location state
   const [courseId, setCourseId] = useState(courseID || location.state?.courseId);

  // Column Heading
  const columns = [
{
    title: "S.NO",
    field: "sNo",
    width: 80,
},
    {
      title: "Weekly On",
      field: "weeklyOn",
      width: 135,
    },
    {
      title: "Start Date",
      field: "startDate",
      width: 165,
    },
    {
      title: "Start Time",
      field: "startTime",
      width: 120,
    },
    {
      title: "End Time",
      field: "endTime",
      width: 120,
    },
    {
      title: "Maximum Enroll Count",
      field: "totalStudentEnrolled",
      width: 145,
    },
    {
      title: "Teacher Assigned",
      render: (rowData) =>
        rowData.teacherId
          ? `${rowData?.teacherId?.firstName || ''} ${rowData?.teacherId?.lastName || ''}`.trim()
          : "Not Scheduled",
      width: 200,
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
  console.log("courseId..123",courseId)
  // Get course schedule
  const courseSchedule = () => {
    const userId = localStorage.getItem("userId");
    if (!courseId) {
      setIsLoading(false);
      toast.error("Course ID not found");
      return;
    }

    Api.get("/api/v1/courseSchedule/course/list", {
      params: {
        courseId: courseId,
        userId: userId,
      },
    })
   .then((res) => {
    const list = res.data.courseList || [];
    const listSchedule = list
        .sort((a, b) => (a.scheduleNumber > b.scheduleNumber ? 1 : -1))
        .map((item, index) => ({
            ...item,
            sNo: index + 1 
        }));
    setData(listSchedule);
    setIsLoading(false);
})
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        } else {
          toast.error("Failed to fetch schedules");
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
        setCourseDetail(courseDetail || {});
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
      toast.error("No course ID provided");
    }
  }, [courseId]);

  // Delete Course Schedule
  const deleteCourseSchedule = (data, resolve) => {
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
        resolve();
        toast.success("Schedule deleted successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data?.message || "Failed to delete schedule");
        }
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
        resolve(); // Always resolve the promise
      });
  };

  // Table options
  const tableOptions = {
    actionsColumnIndex: -1,
    addRowPosition: "first",
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "#1d1464",
      color: "white",
      zIndex: 0,
    },
    rowStyle: {
      backgroundColor: "#fff",
    },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    padding: "dense",
    sorting: true,
    search: true,
    filtering: false,
    showTitle: false, // Set to false since we're showing title separately
    draggable: false,
  };

  return (
    <Container className="mt-1">
      <CourseSideMenu courseId={courseId} />
      <div className="row">
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
                title="" // Remove title from here since we're showing it above
                data={data}
                columns={columns}
                actions={[
                  {
                    icon: () => <AddBox style={{ color: "#1d1464" }} />,
                    tooltip: "Add Schedule",
                    isFreeAction: true,
                    onClick: () => {
                      navigate("/admin/course/schedule/add", {
                        state: {
                           courseID: courseID, 
                          courseName: courseDetail?.name,
                        },
                      });
                    },
                  },
                
                  {
                    icon: () => <Edit style={{ color: "#1458e0" }} />,
                    tooltip: "Edit Schedule",
                    onClick: (event, rowData) => {
                      navigate("/admin/course/schedule/update", {
                        state: {
                          ...rowData,
                          courseId: courseId,
                          courseName: courseDetail?.name
                        }
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
                  header: {
                    actions: "Actions"
                  }
                }}
                options={tableOptions}
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default CourseSchedule;