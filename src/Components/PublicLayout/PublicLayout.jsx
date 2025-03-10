import React from "react";
import { Outlet } from "react-router-dom";
import Allsidebar from "../Core/Allsidebar"      // Your existing sidebar component
import HeaderNavbar from "../Core/HeaderNavbar";
import PublicFooter from "../PublicLayout/PublicFooter";
const PublicLayout = ({ open, onClick }) => {
 
  return (
    <div>
    <div>
    <HeaderNavbar/>
    </div>
    <div>
      {/* Fixed Sidebar */}
      <Allsidebar  />

      {/* Main Content */}
      <div
        style={{
          bottom:"-60px",
          marginLeft: open ? "250px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        <Outlet /> 
      </div>
    </div>
    <div style={{
      bottom :"-50px",
      marginLeft: open ? "250px" : "60px",
      transition: "margin-left 0.3s ease",
      padding: "20px",
    }}>

  
      <PublicFooter/>
    </div>
    </div>
  );
};

export default PublicLayout;


