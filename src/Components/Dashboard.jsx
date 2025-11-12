import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Admindashboard from "./Dashboard/Admindashboard";
import Studentdashboard from "./Dashboard/Studentdashboard";
import Teacherdashboard from "./Dashboard/TeacherDashboard";

function Dashboard() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log(storedRole)
    const userId = localStorage.getItem("userId");

    // ✅ Redirect to login if not authenticated
    // if (!storedRole || !userId) {
    //   navigate("/login");
    //   return;
    // }

    setRole(storedRole);
  }, [navigate]);

  // ✅ Conditional rendering based on role
  if (role === "student") {
    return <Studentdashboard />;
  }

  if (role === "teacher") {
    return <Teacherdashboard />;
  }

  if (role === "admin") {
    return <Admindashboard />;
  }

  // Optional: fallback UI while role is being loaded
  return <div>Loading....</div>;
}

export default Dashboard;
