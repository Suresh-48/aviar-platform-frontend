import React from 'react'
// import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";

import Dashboard from "./Components/Dashboard.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import Login from "./components/Login.jsx";


const App = () => {
  return (
    <div>
    <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        pauseOnHover={false}
        toastClassName="toastRequestSuccess"
        bodyClassName="toastBody"
        closeButton={false}
      />
      <Router>
              <Switch>
              <PublicLayout exact name="" path="/aviar" component={LandingPage}/>
              <PublicLayout exact name="Dashboard" path="/dashboard" component={Dashboard}/> 
              <PublicLayout exact name="AdminLogin" path="/admin-login" component={AdminLogin}/>

              </Switch>
              </Router>
      </div>
  )
}

export default App