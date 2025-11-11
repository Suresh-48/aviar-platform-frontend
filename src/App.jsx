import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

// ⬇ Import all pages/components
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import AboutUs from "./Components/AboutUs/Index";
import Help from "./Components/Help/Index";
import ResetPassword from "./Components/ResetPassword/Password";
import SubmitPassword from "./Components/SubmitPassword/Index";
import Studentsignup from "./Components/studentsignup";
import Teachersignup from "./Components/Teachersignup";
import Course from "./Components/Course";
import Trainers from "./Components/Trainers";
import ChatBotConversation from "./Components/ChatBotConversation/ChatBotConversation";
import PublicLayout from "./Components/PublicLayout/PublicLayout";
import NavbarLoginBefore from "./Components/PublicLayout/navbar";

// Dashboards
import Dashboard from "./Components/Dashboard";
import StudentDashboard from "./Components/Dashboard/Studentdashboard";
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard";

// Admin pages
import CourseCategory from "./Components/CourseCategory/Index";
import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index";
import StudentList from "./Components/AdminStudentList/Index";
import CourseList from "./Components/Courselist/Index";
import TeacherList from "./Components/TeacherList/Index";
import AdminForum from "./Components/Forum/AdminForum";
import AdminPaymentList from "./Components/AdminPaymentList/Index";
import CoursesCreation from "./Components/Course/CourseCreation";
import AdminStudentsList from "./Components/AdminStudentList/Index";

// Teacher pages
import TeacherCourseList from "./Components/TeacherCourseList/Index";
import TeacherProfile from "./Components/TeacherProfile/Index";
import TeacherQuizReview from "./Components/TeacherQuizeReview/Index";
import TeacherHomeworkReview from "./Components/TeacherHomeWorkReview/Index";
import TeacherAvailable from "./Components/TeacherAvailablity/Index";
import ForumSelect from "./Components/Forum/Forumdetail";
import TeacherPayment from "./Components/TeacherPayment/TeacherPayment";
import DisplayTeacherApplication from "./Components/TeacherApplication/DisplayAplication";
import WizardForm from "./Components/TeacherApplication/WizardForm";
import Education from "./Components/TeacherApplication/Education";
import Experience from "./Components/TeacherApplication/Experience";
import OnlineProfile from "./Components/TeacherApplication/OnlineProfile";

// Student pages
import Updatestudentdetail from "./Components/Editstudentdetail/Updatestudentdetail";
import UpcomingSchedule1 from "./Components/Studentupcomingschedule/Upcomingschedule1";
import AllCourseList from "./Components/CourseList/AllCourseList";
import List from "./Components/Favouritecourse/List";
import Quiz from "./Components/ListOfQuiz/Quiz";
import Homework from "./Components/Homework/Homework";
import Transcript from "./Components/Studenttranscript/Transcript";
import ActiveCourses from "./Components/ActiveEnroleCourses/ActiveCourses";
import Forumdetail from "./Components/Forum/Forumdetail";
import CompleteCourse from "./Components/CompleteCourseList/CompleteCourse";
import CourseHistory from "./Components/CourseHistory/CourseHistory";

// Shared components
import CourseDetail from "./Components/Course/CourseDetail";
import CourseLesson from "./Components/CourseLesson/Index";
import CreateCourseLesson from "./Components/CourseLesson/CreateCourseLesson";
import EditCourseLesson from "./Components/CourseLesson/EditCourseLesson";
import EditCourses from "./Components/EditCourses/Index";
import CourseSchedule from "./Components/CourseSchedule/Index";
import CreateCourseSchedule from "./Components/CourseSchedule/CreateCourseSchedule";

// ProtectedRoute
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

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
      <ChatBotConversation />

      <BrowserRouter>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/navbar" element={<NavbarLoginBefore />} />
          <Route path="/forget/password" element={<ResetPassword />} />
          <Route path="/password/change" element={<SubmitPassword />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/signup" element={<Teachersignup />} />
          <Route path="/course/search" element={<Course />} />
          <Route path="/trainers" element={<Trainers />} />

          {/* 👩‍🎓 Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route
              path="/student"
              element={
                <PublicLayout>
                  <Outlet />
                </PublicLayout>
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
          </Route>

          {/* 🧑‍🏫 Teacher Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route
              path="/teacher"
              element={
                <PublicLayout>
                  <Outlet />
                </PublicLayout>
              }
            >
              <Route index element={<Navigate to="/teacher/dashboard" />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="menu" element={<WizardForm />} />
              <Route path="schedule/:id" element={<TeacherCourseList />} />
              <Route path="profile/:id" element={<TeacherProfile />} />
              <Route path="upcoming/schedule/list" element={<UpcomingTeacherScheduleList />} />
              <Route path="review/quiz" element={<TeacherQuizReview />} />
              <Route path="homework/review" element={<TeacherHomeworkReview />} />
              <Route path="not-available/time" element={<TeacherAvailable />} />
              <Route path="forum/details" element={<ForumSelect />} />
              <Route path="payments" element={<TeacherPayment />} />
              <Route path="application/details" element={<DisplayTeacherApplication />} />
              <Route path="education" element={<Education />} />
              <Route path="experience" element={<Experience />} />
              <Route path="online/profile" element={<OnlineProfile />} />
            </Route>
          </Route>

          {/* 👑 Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/admin"
              element={
                <PublicLayout>
                  <Outlet />
                </PublicLayout>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="course/category" element={<CourseCategory />} />
              <Route path="course/search" element={<AllCourseList />} />
              <Route path="course/lesson/edit/:id" element={<EditCourseLesson />} />
              <Route path="course/lesson" element={<CourseLesson />} />
              <Route path="course/lesson/add" element={<CreateCourseLesson />} />
              <Route path="course/edit/1" element={<EditCourses />} />
              <Route path="course/schedule" element={<CourseSchedule />} />
              <Route path="course/schedule/add" element={<CreateCourseSchedule />} />
              <Route path="students/list" element={<StudentList />} />
              <Route path="course/list" element={<CourseList />} />
              <Route path="teacher/list" element={<TeacherList />} />
              <Route path="forum" element={<AdminForum />} />
              <Route path="course/detail" element={<CourseDetail />} />
              <Route path="payment/list" element={<AdminPaymentList />} />
              <Route path="course/add" element={<CoursesCreation />} />
              <Route path="upcoming/schedule/list" element={<AdminStudentsList />} />
            </Route>
          </Route>

          {/* 🔁 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
