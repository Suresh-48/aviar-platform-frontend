import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Admindashboard from './Components/Dashboard/Admindashboard.jsx';
import Login from './Components/Login.jsx';
import Studentsignup from './Components/studentsignup.jsx';
import Teachersignup from './Components/Teachersignup.jsx';
import CourseCategory from './Components/CourseCategory/Index.jsx';
import AllCourseList from "./Components/CourseList/AllCourseList.jsx";
import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index.jsx";
import StudentList from "./Components/AdminStudentList/Index.jsx";
import CourseList from "./Components/Courselist/Index.jsx";
import Allsidebar from './Components/Core/Allsidebar.jsx';
import TeacherList from "./Components/TeacherList/Index.jsx";
import AdminForum from "./Components/Forum/AdminForum.jsx";
import AdminPaymentList from "./Components/AdminPaymentList/Index.jsx";
import Updatestudentdetail from "./Components/Editstudentdetail/Updatestudentdetail";
import UpcomingSchedule1 from "./Components/Studentupcomingschedule/Upcomingschedule1";
import List from "./Components/Favouritecourse/List";
import Quiz from "./Components/ListOfQuiz/Quiz.jsx";
import Homework from "./Components/Homework/Homework";
import Transcript from "./Components/Studenttranscript/Transcript";
import ActiveCourses from "./Components/ActiveEnroleCourses/ActiveCourses";
import Forumdetail from "./Components/Forum/Forumdetail";
import CompleteCourse from "./Components/CompleteCourseList/CompleteCourse";
import CourseHistory from "./Components/CourseHistory/CourseHistory";
import StudentDashboard from './Components/Dashboard/Studentdashboard.jsx';
import TeacherCourseList from "./Components/TeacherCourseList/Index.jsx";
import TeacherProfile from "./Components/TeacherProfile/Index.jsx";
import TeacherQuizReview from "./Components/TeacherQuizeReview/Index.jsx";
import TeacherHomeworkReview from "./Components/TeacherHomeWorkReview/Index.jsx";
import TeacherAvailable from "./Components/TeacherAvailablity/Index.jsx";
import ForumSelect from "./Components/Forum/Forumdetail.jsx";
import TeacherPayment from "./Components/TeacherPayment/TeacherPayment.jsx";
import DisplayTeacherApplication from "./Components/TeacherApplication/DisplayAplication.jsx";
import PublicLayout from './Components/PublicLayout/PublicLayout.jsx';

const App = () => {
  // const [open, setOpen] = useState(false);

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar pauseOnHover={false} toastClassName="toastRequestSuccess" bodyClassName="toastBody" closeButton={false} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/signup" element={<Teachersignup />} />

          {/* Protected Routes with Sidebar */}
          <Route
            path="/student"
            element={
              <>
                {/* <Allsidebar /> */}
                <PublicLayout open={open} onClick={() => setOpen(!open)}>
                  <Outlet />
                </PublicLayout>
              </>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="update/detail" element={<Updatestudentdetail />} />
            <Route path="upcoming/schedule1" element={<UpcomingSchedule1 />} />
            <Route path="allcourselist" element={<AllCourseList />} />
            <Route path="list" element={<List />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="homework" element={<Homework />} />
            <Route path="transcript" element={<Transcript />} />
            <Route path="activecourses" element={<ActiveCourses />} />
            <Route path="forum/detail" element={<Forumdetail />} />
            <Route path="completecourse" element={<CompleteCourse />} />
            <Route path="course/history" element={<CourseHistory />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <>
                {/* <Allsidebar /> */}
                <PublicLayout open={open} onClick={() => setOpen(!open)}>
                  <Outlet />
                </PublicLayout>
              </>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Admindashboard />} />
            <Route path="coursecategory" element={<CourseCategory />} />
            <Route path="course/search" element={<AllCourseList />} />
            <Route path="upcoming/schedule" element={<UpcomingTeacherScheduleList />} />
            <Route path="students/list" element={<StudentList />} />
            <Route path="course/list" element={<CourseList />} />
            <Route path="teacher/list" element={<TeacherList />} />
            <Route path="forum" element={<AdminForum />} />
            <Route path="payment/list" element={<AdminPaymentList />} />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <>
                {/* <Allsidebar /> */}
                <PublicLayout open={open} onClick={() => setOpen(!open)}>
                  <Outlet />
                </PublicLayout>
              </>
            }
          >
            
            <Route index element={<Navigate to="/teacher/dashboard" />} />
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="courselist" element={<TeacherCourseList />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="upcoming/schedule" element={<UpcomingTeacherScheduleList />} />
            <Route path="quiz/review" element={<TeacherQuizReview />} />
            <Route path="homework/review" element={<TeacherHomeworkReview />} />
            <Route path="available" element={<TeacherAvailable />} />
            <Route path="forum/select" element={<ForumSelect />} />
            <Route path="payment" element={<TeacherPayment />} />
            <Route path="application/details" element={<DisplayTeacherApplication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
