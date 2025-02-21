import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Only import once
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Login from './Components/Login.jsx';
import CourseCategory from './Components/CourseCategory/Index.jsx';

// import PublicLayout from './Components/PublicLayout/PublicLayout.jsx'


const App = () => {
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        pauseOnHover={false}
        toastClassName="toastRequestSuccess"
        bodyClassName="toastBody"
        closeButton={false}
      />
      <BrowserRouter>
        <Routes>
          {/* <PublicLayout> */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          {/* Add a default route or redirect if needed */}
          <Route path="/" element={<Navigate to="/aviar" />} />
          <Route path="/admin/coursecategory" element={<CourseCategory/>}/>
          <Route path=""/>
          {/* </PublicLayout> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
