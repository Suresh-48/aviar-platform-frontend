import React from "react";
import { Outlet } from "react-router-dom";
import Allsidebar from "../Core/Allsidebar"      // Your existing sidebar component

const PublicLayout = ({ open, onClick }) => {
 
  return (
    <div>
      <Allsidebar  />

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


