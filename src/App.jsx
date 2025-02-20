<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Only import once
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Login from './Components/Login.jsx';
=======
import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Studentsignup from'./Components/studentsignup'
import Teachersignup from'./Components/Teachersignup'
import Studentsidebar from './Components/Core/Studentsidebar'
import Updatestudentdetail from'./Components/Editstudentdetail/Updatestudentdetail'
import UpcomingSchedule1 from './Components/Studentupcomingschedule/Upcomingschedule1'
import AllCourseList from './Components/Courselist/AllCourseList'
import PublicFooter from './Components/PublicLayout/PublicFooter'
// import Admindashboard from'./Components/Dashboard/AdminDashboard'
// import Dashboard from './components/Dashboard'
// import LandingPage from './Components/LandingPage'
// import Admin from './Components/Admin'
// import Teacher from './Components/Teacher'
// import Student from './Components/Student'
// import StudentDashboard from './Components/Dashboard/Studentdashboard'
>>>>>>> feature/login-page-UI

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
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          {/* Add a default route or redirect if needed */}
          <Route path="/" element={<Navigate to="/aviar" />} />
        </Routes>
      </Router>
    </div>
  );
};
=======
          <Route path='/' element={<Login />} />
          <Route path='Studentsignup' element={<Studentsignup />} />
          <Route path='Teachersignup' element={<Teachersignup />} />
          <Route path='Studentsidebar' element={<Studentsidebar />} />
          <Route path='/Updatestudentdetail' element={<Updatestudentdetail />} />
          <Route path='/Upcomingschedule1' element={<UpcomingSchedule1 />} />
          <Route path='AllCourseList' element={<AllCourseList />} />
          {/* <Route path='Admindashboard' element={<Admindashboard />} /> */}
            {/* <Route path='/' element={<LandingPage />} />
            <Route path='dashBoard' element={<Dashboard />} />
            <Route path='admin' element={<Admin />} />
            <Route path='teacher' element={<Teacher />} />
            <Route path='student' element={<Student />} /> */}
            
        </Routes>
        <PublicFooter />
    </BrowserRouter>
  
  )
}
>>>>>>> feature/login-page-UI

export default App;
