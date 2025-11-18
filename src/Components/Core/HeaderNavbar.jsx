import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import aviar from "../../Images/aviar.png";

const HeaderNavbar = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [image, setImage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setFirstName(parsed.firstName || "");
      setLastName(parsed.lastName || "");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) logout();
  };

  return (
    <nav
      style={{
        backgroundColor: "#fff",
        height: "60px",
        padding: "0 15px",
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <img
        src={aviar}
        alt="Logo"
        style={{
          width: "110px",
          maxWidth: "100%",
          height: "auto",
        }}
      />

      {/* Avatar Dropdown */}
      <div className="dropdown" style={{ position: "relative" }}>
        <div
          className="dropdown-toggle"
          onClick={() => {
            const menu = document.getElementById("profile-menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
          }}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {image ? (
            <img
              src={image}
              alt="User"
              width="40"
              height="40"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Avatar name={`${firstName} ${lastName}`} size="40" round />
          )}
        </div>

        {/* Dropdown Menu */}
        <div
          id="profile-menu"
          style={{
            display: "none",
            position: "absolute",
            right: 0,
            marginTop: "8px",
            background: "#fff",
            borderRadius: "6px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            padding: "10px",
            width: "180px",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", paddingBottom: "8px" }}>
            Signed in as <strong>{firstName} {lastName}</strong>
          </p>
          <hr />
          <button
            onClick={confirmLogout}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "left",
              padding: "6px 0",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavbar;
