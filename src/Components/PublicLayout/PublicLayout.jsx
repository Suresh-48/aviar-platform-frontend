import React, { Component, Suspense, useState, useEffect } from "react";
import {Navigate,BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

// routes config
// import routes from "../../routes";
import HeaderNavbar from "../../Components/Core/HeaderNavbar";
import DashboardSidebar from "../../Components/Core/DashboardSidebar";
import ChatBotConversation from "../../Components/ChatBotConversation/ChatBotConversation";
// import { OpenInBrowserOutlined } from "@mui/icons-material";
import NavbarLoginBefore from "./navbar";

const PublicFooter = React.lazy(() => import("./PublicFooter"));

const PublicLayout = () => {
  // const LandingPage = props?.name;
  // const sideClose = props?.location?.state?.sidebar;
  // const [role, setrole] = useState("");
  // const [open, setopen] = useState(false);
  // const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  // const value = () => {
  //   setopen(!open);
  // };

  useEffect(() => {
    let role = localStorage.getItem("role");
    setrole(role);
  }, [sideClose]);

  let showNav = "";

  return (
    <div className="app">
      <div className="app-body">
        <div>
        <NavbarLoginBefore />
        <HeaderNavbar/>
        </div>
          {/* {role ? <DashboardSidebar onClick={value} open={open} sidebar={sideClose} /> : null}
          {role ? <HeaderNavbar sidebar={sideClose} open={open} /> : <NavbarLoginBefore />} */}

          {/* <div className={`${open ? "site-maincontent home-content" : "site-maincontent active home-content"}`}> */}
          {/* <div
            className={`${
              role
                ? open
                  ? "site-maincontent home-content"
                  : "site-maincontent active home-content"
                : LandingPage === "LandingPage"
                ? " home-content-login"
                : "home-page-landing-navbar"
            }`}
          > */}
          <div>
            <Outlet/>
            </div>
            {/* <div className="footer-min-height"> */}
              {/* <BrowserRouter>
                <Routes>
                  {routes.map((route, idx) => {
                    return route.component ? ( 
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : (
                      ""
                    );
                  })}
                </Routes>
              </BrowserRouter> */}
            {/* </div> */}
            <div>
            <ChatBotConversation />
            {/* {LandingPage === "LandingPage" ? null : ( */}
              <footer className={`footer footer-content ${showNav}`}>
                <Suspense fallback={loading()}>
                  <PublicFooter sidebar={sideClose} />
                </Suspense>
              </footer>
            {/* )} */}
          </div>
        </div>
  
    // </div>
  );
};

export default PublicLayout;

