import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import AviarComponent from './Components/AviarComponent'; 
import NavbarLoginBefore from './Components/PublicLayout/navbar';
import Login from './Components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicLayout from './Components/PublicLayout/PublicLayout';
import Admindashboard from './Components/Dashboard/Admindashboard.jsx';
import CourseCategory from './Components/CourseCategory/Index.jsx';
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
        <Route element ={<PublicLayout/>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aviar" element={<AviarComponent />} />
           <Route path ='/navbar' element={< NavbarLoginBefore/>}/>
          <Route path ='/admindashboard' element={<Admindashboard/>}/>
          <Route path='/coursecategory' element={<CourseCategory/>}/>
          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;



