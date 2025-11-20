import React, { useState, useEffect } from "react";
import tableIcons from "../core/TableIcons";
import MaterialTable from "material-table";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material";
import { ROLES_ADMIN } from "../../Constants/Role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Api from "../../Api";
import Loader from "../core/Loader";
import { toast } from "react-toastify";

const columns = [
  { title: "S.No", render: (rowData) => `${rowData.tableData.id + 1}` },
  {
    title: "Category",
    field: "courseId.category.name",
  },
  {
    title: "Course Name",
    field: "courseId.name",
    render: (rowData) => (
      <Link
        className="linkColor"
        to={`/admin/course/detail/${rowData.courseId?.aliasName}`}
        state={{ courseId: rowData.id }}
      >
        {rowData.courseId.name}
      </Link>
    ),
  },
  { title: "Start Date", field: "startDate" },
  { title: "Weekly On", field: "weeklyOn" },
  { title: "Start Time", field: "startTime" },
  { title: "End Time", field: "endTime" },
];

function TeacherCourseList() {
  const { id } = useParams(); // ✅ replaces props.match.params.id
  const location = useLocation(); // ✅ replaces props.location
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState(id);
  const [firstName, setFirstName] = useState(location.state?.rowData?.firstName || "");
  const [lastName, setLastName] = useState(location.state?.rowData?.lastName || "");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");
  const [colId, setColId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

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

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
    getTeacherScheduleList();
  }, []);

  const isAdmin = role === ROLES_ADMIN;

  const getTeacherScheduleList = () => {
    Api.get(`api/v1/teacher/course/list`, {
      params: {
        teacherId: teacherId,
        userId: userId,
      },
    })
      .then((response) => {
        const data = response.data.teacherCourses;
        setData(data);
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

  return (
    <Container className="mb-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-flex justify-content-center align-items-center py-3">
            <h5>
              {isAdmin
                ? `${firstName} ${lastName} Schedule List`
                : "Schedule List"}
            </h5>
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
                actions={[
                  (rowData) => ({
                    icon: () => (
                      <Dropdown>
                        <Dropdown.Toggle
                          className="teacher-menu-dropdown"
                          variant="link"
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            size="sm"
                            color="#397ad4"
                          />
                        </Dropdown.Toggle>
                        {colId === rowData.id ? (
                          <Dropdown.Menu
                            align="end"
                            className="menu-dropdown-status py-0"
                          >
                            <Dropdown.Item className="status-list">
                              <Link
                                to={`/upcoming/schedule/${colId}`}
                                state={{ rowData }}
                                className="collapse-text-style"
                              >
                                Upcoming Schedule
                              </Link>
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item className="status-list">
                              <Link
                                to={`/class/student/list/${rowData.id}`}
                                state={{ rowData }}
                                className="collapse-text-style"
                              >
                                Students List
                              </Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        ) : null}
                      </Dropdown>
                    ),
                    onClick: (event, rowData) => {
                      setColId(rowData.id);
                      setIsOpen(!isOpen);
                    },
                  }),
                ]}
                localization={{
                  body: {
                    emptyDataSourceMessage:
                      "Teacher Course List Yet to be Scheduled",
                  },
                }}
              />
            </ThemeProvider>
          </div>
        </div>
      )}
    </Container>
  );
}

export default TeacherCourseList;
