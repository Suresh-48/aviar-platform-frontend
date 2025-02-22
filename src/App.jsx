import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Studentsignup from "./Components/Studentsignup";
import Teachersignup from "./Components/Teachersignup";
import Studentsidebar from "./Components/Core/Studentsidebar";
import StudentDashboard from "./Components/Dashboard/Studentdashboard";
import Updatestudentdetail from "./Components/Editstudentdetail/Updatestudentdetail";
import UpcomingSchedule1 from "./Components/Studentupcomingschedule/Upcomingschedule1";
import AllCourseList from "./Components/Courselist/AllCourseList";
import List from "./Components/Favouritecourse/List";
import Quize from "./Components/ListOfQuize/Quize";
import Homework from "./Components/Homework/Homework";
import Transcript from "./Components/Studenttranscript/Transcript";
import ActiveCourses from "./Components/ActiveEnroleCourses/ActiveCourses";
import Forumdetail from "./Components/Forum/Forumdetail";
import CompleteCourse from "./Components/CompleteCourseList/CompleteCourse";
import CourseHistory from "./Components/CourseHistory/CourseHistory";
import PublicFooter from "./Components/PublicLayout/PublicFooter";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Studentsidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className={`content ${sidebarOpen ? "content-shifted" : ""}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Studentsignup" element={<Studentsignup />} />
            <Route path="/Teachersignup" element={<Teachersignup />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/Updatestudentdetail" element={<Updatestudentdetail />} />
            <Route path="/Upcomingschedule1" element={<UpcomingSchedule1 />} />
            <Route path="/AllCourseList" element={<AllCourseList />} />
            <Route path="/List" element={<List />} />
            <Route path="/Quize" element={<Quize />} />
            <Route path="/Homework" element={<Homework />} />
            <Route path="/Transcript" element={<Transcript />} />
            <Route path="/ActiveCourses" element={<ActiveCourses />} />
            <Route path="/Forumdetail" element={<Forumdetail />} />
            <Route path="/CompleteCourse" element={<CompleteCourse />} />
            <Route path="/CourseHistory" element={<CourseHistory />} />
          </Routes>
          <PublicFooter />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
