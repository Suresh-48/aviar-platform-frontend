import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Row,
  Form,
  Col,
  Overlay,
  Tooltip,
  FormControl,
  Button,
} from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Formik } from "formik";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { createRoot } from 'react-dom/client';
import moment from "moment-timezone";
import { useNavigate, useLocation } from "react-router-dom";

// Component

// Api
import Api from "../Api";

// Styles
import "../CSS/Calendar.css";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

function ScheduleForCalendarFormat(props) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [studentId, setstudentId] = useState(location?.state?.studentId);
  const [parentId, setparentId] = useState(location?.state?.parentId);
  const [teacherId, setteacherId] = useState(location?.state?.teacherId);
  const [firstName, setfirstName] = useState(location?.state?.firstName);
  const [lastName, setlastName] = useState(location?.state?.lastName);
  const [schedule, setschedule] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  //logout
  const logout = () => {
    setTimeout(() => {
      localStorage.clear();
      navigate("/kharpi");
      window.location.reload();
    }, 2000);
  };

  // Overlay for tooltip
  function Event(event) {
    const [showTooltip, setShowTooltip] = useState(false);
    const ref = useRef(null);

    const closeTooltip = () => {
      setShowTooltip(false);
    };
    
    const openTooltip = () => {
      setShowTooltip(true);
    };

    const getTarget = () => {
      return ref.current;
    };

    const eventData = event.event;

    return (
      <div ref={ref}>
        <span onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
          {event.title}
        </span>
        <Overlay
          rootClose
          target={getTarget}
          show={showTooltip}
          placement="top"
        >
          {(props) => (
            <Tooltip id="test" {...props}>
              <span>
                <div>{event.title}</div>
              </span>
            </Tooltip>
          )}
        </Overlay>
      </div>
    );
  }

  const getStudentScheduleList = () => {
    Api.get(`api/v1/upcomingCourse/calendar/view`, {
      params: {
        studentId: studentId,
        userId: userId,
      },
    })
      .then((response) => {
        const data = response.data.upcomingList;
        setschedule(data);
        const updatedData = data.map(item => ({
          ...item,
          start: moment.utc(item.start).toDate(),
          end: moment.utc(item.end).toDate(),
        }));
        setschedule(updatedData);
        setisLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const getParentScheduleList = () => {
    Api.get(`api/v1/upcomingCourse/calendar/view`, {
      params: {
        parentId: parentId,
        userId: userId,
      },
    })
      .then((response) => {
        const data = response.data.upcomingList;
        const updatedData = data.map(item => ({
          ...item,
          start: moment.utc(item.start).toDate(),
          end: moment.utc(item.end).toDate(),
        }));
        setschedule(updatedData);
        setisLoading(false);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
          toast.error("Session Timeout");
        }
      });
  };

  const getTeacherScheduleList = async () => {
    const teacherSchedule = location.state.teacherSchedule;
    if (teacherSchedule) {
      const updatedSchedule = teacherSchedule.map(item => ({
        ...item,
        start: moment.utc(item.start).toDate(),
        end: moment.utc(item.end).toDate(),
      }));
      setschedule(updatedSchedule);
    }
    setisLoading(false);
  };

  useEffect(() => {
    if (studentId) {
      getStudentScheduleList();
    } else if (parentId) {
      getParentScheduleList();
    } else if (teacherId) {
      getTeacherScheduleList();
    }
  }, [studentId, parentId, teacherId]);

  function eventStyleGetter(event, start, end, isSelected) {
    const style = {
      backgroundColor: "#74be9c",
      borderRadius: "6px",
      color: "black",
      fontSize: 14,
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="pt-1 mx-3">
        <div className="d-flex justify-content-end pt-3">
          <FontAwesomeIcon
            icon={faTable}
            color="#397ad4"
            style={{ cursor: "pointer", fontSize: 30 }}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        {firstName === undefined && lastName === undefined ? null : (
          <h5 className="d-flex justify-content-center align-items-center pb-3">
            {`${firstName + " " + lastName + " Upcoming Schedule "}`}
          </h5>
        )}
        <Calendar
          tooltipAccessor={null}
          views={["month", "day", "agenda"]}
          components={{ event: Event }}
          selectable={true}
          localizer={localizer}
          events={schedule}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event) => eventStyleGetter(event)}
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </div>
  );
}

export default ScheduleForCalendarFormat;