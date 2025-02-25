import React from "react";
import { Outlet } from "react-router-dom";
import Adminsidebar from "../Core/Adminsidebar"      // Your existing sidebar component

const PublicLayout = ({ open, onClick }) => {
  console.log("open..",open)
  console.log("onClick...",onclick)
  return (
    <div>
      {/* Fixed Sidebar */}
      <Adminsidebar  />

      {/* Main Content */}
      <div
        style={{
          marginLeft: open ? "250px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <Outlet /> 
      </div>
    </div>
  );
};


export default PublicLayout;


