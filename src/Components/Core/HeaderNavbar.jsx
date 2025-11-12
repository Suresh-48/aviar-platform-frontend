import React, { useEffect, useState } from "react";
import {
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import aviar from "../../Images/aviar.png";

const HeaderNavbar = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [image, setImage] = useState("");

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <Navbar
      light
      expand="md"
      style={{
        backgroundColor: "#ffffff",
        padding: "8px 20px",
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
      }}
      className="shadow-sm"
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={aviar} alt="Logo" width="120" height="35" />
      </div>

      {/* User Dropdown */}
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret style={{ display: "flex", alignItems: "center" }}>
          {image ? (
            <img
              src={image}
              alt="User"
              width="40"
              height="40"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "8px",
              }}
            />
          ) : (
            <Avatar
              name={`${firstName} ${lastName}`}
              size="40"
              round={true}
              color="silver"
              style={{ marginRight: "8px", cursor: "pointer" }}
            />
          )}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem header>
            Signed in as <strong>{firstName} {lastName}</strong>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={confirmLogout}>🚪 Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
};

export default HeaderNavbar;
