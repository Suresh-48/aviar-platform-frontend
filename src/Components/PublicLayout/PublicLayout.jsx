import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Allsidebar from "../Core/Allsidebar";
import HeaderNavbar from "../Core/HeaderNavbar";
import PublicFooter from "../PublicLayout/PublicFooter";
import Footer from "../Footer";
const PublicLayout = () => {
  const [open, setOpen] = useState(true);

  // Auto close sidebar for screens <= 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ 
          minHeight: "100vh", 
          background: "#f8f9fa" }}>

      <div
        style={{
          width: open ? "250px" : "70px",
          transition: "0.3s",
          position: "fixed",    // IMPORTANT
          top: 0,
          left: 0,
          height: "100vh",
          // background: "#fff",
          zIndex: 9999,         // HIGHER THAN EVERYTHING
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* Sidebar */}
        <Allsidebar open={open} setOpen={setOpen} />
      </div>

      {/* Main Section */}
      <div
        style={{
          marginLeft: open ? (window.innerWidth > 1024 ? "250px" : "0px") : "70px",
          transition: "margin-left 0.3s ease",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <HeaderNavbar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>

        {/* Footer */}
        <footer
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
