import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; // Import the AuthContext
import HeaderNavbar from "../../Components/Core/HeaderNavbar";
import Adminsidebar from "../Core/Adminsidebar";
import routes from "../../routes";
import ChatBotConversation from "../../Components/ChatBotConversation/ChatBotConversation";

const PublicLayout = () => {
  // const { isAuthenticated } = useContext(AuthContext); // Get authentication state
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="app">
      <div className="app-body">
        {/* Render HeaderNavbar and Adminsidebar only if authenticated */}
        {isAuthenticated && <HeaderNavbar toggleSidebar={toggleSidebar} />}
        {isAuthenticated && <Adminsidebar isOpen={open} />}

        {/* Main content area */}
        <div className={`main-content ${isAuthenticated ? "with-sidebar" : ""}`}>
          <Outlet />
          <BrowserRouter>
            <Routes>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </div>

        {/* ChatBotConversation (optional) */}
        {isAuthenticated && <ChatBotConversation />}
      </div>
    </div>
  );
};

export default PublicLayout;
