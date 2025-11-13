import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Allsidebar from "../Core/Allsidebar";
import HeaderNavbar from "../Core/HeaderNavbar";
import PublicFooter from "../PublicLayout/PublicFooter";

const PublicLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <Allsidebar open={open} setOpen={setOpen} />

      {/* Main Section */}
      <div
        style={{
          marginLeft: open ? "250px" : "70px",
          transition: "margin-left 0.3s ease",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <HeaderNavbar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>

        {/* Footer */}
        <footer
          style={{
            // padding: "10px",
            // background: "#1a1d24",
            color: "white",
            textAlign: "center",
          }}
        >
          <PublicFooter />
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
