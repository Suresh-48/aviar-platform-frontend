import React, { useState, useEffect } from 'react'
import { ROLES_ADMIN, ROLES_STUDENT, ROLES_TEACHER } from '../../Constants/Role'
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./Studentdashboard";
import TeacherDashboard from "./Teacherdashboard";

const Dashboard = () => {

    const[Role,setRole]=useState("")
    const isTeacher = Role === ROLES_TEACHER;
    const isStudent = Role === ROLES_STUDENT;
    
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role);
      }, []);
    return (
        <>
        {isTeacher?(<TeacherDashboard/>)
        :isStudent?(<StudentDashboard/>):
        (<AdminDashboard/>)}
        </>
    );
}
export default Dashboard;


