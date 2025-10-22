import React, { useEffect, useState } from "react";
// import {  ROLES_STUDENT, ROLES_TEACHER } from "../Constants/Role";
import Admindashboard from "./Dashboard/Admindashboard";

import Studentdashboard from "./Dashboard/Studentdashboard";
import Teacherdashboard from "./Dashboard/TeacherDashboard";

function Dashboard({props}) {
  const [role, setRole] = useState("");

  // const isStudent = role === ROLES_STUDENT;
  // const isTeacher = role === ROLES_TEACHER;
 const userRole = localStorage.getItem("role");
  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <>
      {userRole=="student" ? (
        <Studentdashboard />
      ) : userRole=="teacher" ? (
        <Teacherdashboard />
      ) : ( 
        <Admindashboard />
      )}
    </>
  );
}

export default Dashboard;