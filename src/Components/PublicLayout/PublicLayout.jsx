import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import routes from "../../routes";
import HeaderNavbar from "../../Components/Core/HeaderNavbar";
import DashboardSidebar from "../../Components/Core/DashboardSidebar";
import ChatBotConversation from "../../Components/ChatBotConversation/ChatBotConversation";
import NavbarLoginBefore from "./navbar";

const PublicFooter = React.lazy(() => import("./PublicFooter"));

const PublicLayout = (props) => {
  const LandingPage = props.name;
  const sideClose = props.location?.state?.sidebar;
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [sideClose]);

  return (
    <div className="app">
      <div className="app-body">
        {role ? <DashboardSidebar onClick={() => setOpen(!open)} open={open} sidebar={sideClose} /> : null}
        {role ? <HeaderNavbar sidebar={sideClose} open={open} /> : <NavbarLoginBefore />}

        <div className={`${open ? "site-maincontent home-content" : "site-maincontent active home-content"}`}>
          <Outlet />
          <div className="footer-min-height">
            <Routes>
              {routes.map((route, idx) =>
                route.component ? <Route key={idx} path={route.path} element={<route.component />} /> : null
              )}
            </Routes>
          </div>

          <ChatBotConversation />
          {LandingPage !== "LandingPage" && (
            <footer className="footer footer-content">
              <Suspense fallback={<div className="animated fadeIn pt-1 text-center">Loading...</div>}>
                <PublicFooter sidebar={sideClose} />
              </Suspense>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
