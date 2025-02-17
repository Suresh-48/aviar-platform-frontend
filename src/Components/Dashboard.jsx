import React, { useEffect, useState } from "react";
import { ROLES_PARENT, ROLES_STUDENT, ROLES_TEACHER } from "../Constants/Role";
import Admindashboard from "../Admindashboard";

import StudentDashboard from "../Studentdashboard";
import TeacherDashboard from "../Teacherdashboard";

function Dashboard(props) {
  const [role, setRole] = useState("");

  const isStudent = role === ROLES_STUDENT;
  const isTeacher = role === ROLES_TEACHER;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <>
      {isParent ? (
        <StudentDashboard />
      ) : isTeacher ? (
        <TeacherDashboard />
      ) : (
        <AdminDashboard />
      )}
    </>
  );
}

export default Dashboard;