import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard.jsx';
import Help from "./Components/Help/Index.jsx";
import AboutUs from "./Components/AboutUs/Index.jsx";
import ChatBotConversation from "./Components/ChatBotConversation/ChatBotConversation.jsx";
import AdminLogin from './Components/AdminLogin.jsx';
import Admindashboard from './Components/Dashboard/Admindashboard.jsx';
import Login from './Components/Login.jsx';
import CoursesCreation from "./Components/Course/CourseCreation.jsx";
import QuizIntegration from "./Components/QuizIntegration/QuizIntegration.jsx";
import ResetPassword from "./Components/ResetPassword/Password.jsx";
import SubmitPassword from './Components/SubmitPassword/Index.jsx'
import Studentsignup from './Components/studentsignup.jsx';
import Teachersignup from './Components/Teachersignup.jsx';
import Course from "./Components/Course.jsx";
import Trainers from "./Components/Trainers.jsx";
import CourseDetail from "./Components/Course/CourseDetail.jsx";
import CourseCategory from './Components/CourseCategory/Index.jsx';
import AllCourseList from "./Components/CourseList/AllCourseList.jsx";
import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index.jsx";
import StudentList from "./Components/AdminStudentList/Index.jsx";
import CourseList from "./Components/Courselist/Index.jsx";
import Allsidebar from './Components/Core/Allsidebar.jsx';
import EditCourseLesson from './Components/CourseLesson/EditCourseLesson.jsx'
import TeacherList from "./Components/TeacherList/Index.jsx";
import AdminForum from "./Components/Forum/AdminForum.jsx";
import AdminPaymentList from "./Components/AdminPaymentList/Index.jsx";
import Updatestudentdetail from "./Components/Editstudentdetail/Updatestudentdetail";
import UpcomingSchedule1 from "./Components/Studentupcomingschedule/Upcomingschedule1";
import List from "./Components/Favouritecourse/List";
import Quiz from "./Components/ListOfQuiz/Quiz";
import Homework from "./Components/Homework/Homework";
import Transcript from "./Components/Studenttranscript/Transcript";
import ActiveCourses from "./Components/ActiveEnroleCourses/ActiveCourses";
import Forumdetail from "./Components/Forum/Forumdetail";
import CompleteCourse from "./Components/CompleteCourseList/CompleteCourse";
import CourseHistory from "./Components/CourseHistory/CourseHistory";
import StudentDashboard from './Components/Dashboard/Studentdashboard.jsx';
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard.jsx";
import TeacherCourseList from "./Components/TeacherCourseList/Index.jsx";
import TeacherProfile from "./Components/TeacherProfile/Index.jsx";
import TeacherQuizReview from "./Components/TeacherQuizeReview/Index.jsx";
import TeacherHomeworkReview from "./Components/TeacherHomeWorkReview/Index.jsx";
import TeacherAvailable from "./Components/TeacherAvailablity/Index.jsx";
import ForumSelect from "./Components/Forum/Forumdetail.jsx";
import TeacherPayment from "./Components/TeacherPayment/TeacherPayment.jsx";
import DisplayTeacherApplication from "./Components/TeacherApplication/DisplayAplication.jsx";
import PublicLayout from './Components/PublicLayout/PublicLayout.jsx';
import NavbarLoginBefore from "./Components/PublicLayout/navbar";
import CourseLesson from "./Components/CourseLesson/Index.jsx";
import CreateCourseLesson from "./Components/CourseLesson/CreateCourseLesson.jsx";
import EditCourses from "./Components/EditCourses/Index.jsx"
import CourseSchedule from "./Components/CourseSchedule/Index.jsx";
import CreateCourseSchedule from "./Components/CourseSchedule/CreateCourseSchedule.jsx";
import Menu from "./Components/TeacherApplication/Menu.jsx";
import Education from "./Components/TeacherApplication/Education.jsx";
import Experience from"./Components/TeacherApplication/Experience.jsx"
import OnlineProfile from "./Components/TeacherApplication/OnlineProfile.jsx";
import AdminStudentsList from "./Components/AdminStudentList/Index.jsx";
import WizardForm from "./Components/TeacherApplication/WizardForm.jsx"
import AdminUpcomingScheduleList from "./Components/AdminUpcomingScheduleList/Index.jsx";
import TeacherPublicProfile from "./Components/TeacherPublicProfileView/Index.jsx";
import EditTeacher from "./Components/EditTeacher/Index.jsx";
import TeacherResetPassword from "./Components/TeacherResetPassword/Index.jsx"
import CalendarView from "./Components/CalendarView/Index.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ForumsComments from "./Components/Forum/ForumsComments.jsx";
import CalenderViewUpcomingSchedule from "./Components/CalendarViewUpcomingSchedule.jsx"
import QuizPreview from "./Components/QuizPreview/Index.jsx";
import Quizs from "./Components/Quiz/Index.jsx";
import Forum from "./Components/Forums/Index.jsx";
import StudentHomeWork from "./Components/HomeWork/StudentHomework.jsx";
import HomeWorkPreview from "./Components/HomeWorkPreview/Index.jsx";
import HomeWorkReview from "./Components/HomeWorkReview/Index.jsx";
import ScheduleForCalendarView from "./Components/ScheduleForCalendarView/Index.jsx";
const App = () => {
  const [open, setOpen] = useState(false);
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/forget/password" element={<ResetPassword />} />
          <Route path="/course/search" element={<Course/>} />
          <Route path="/trainers" element={<Trainers/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/navbar" element={<NavbarLoginBefore />} />
          <Route path="/forget/password" element={<ResetPassword />} />
          <Route path="/password/change" element={<SubmitPassword />} />
          <Route path="/student/signup" element={<Studentsignup />} />
          <Route path="/teacher/signup" element={<Teachersignup />} />

          {/* Student Routes */}
           <Route element={<ProtectedRoute allowedRoles={["student"]} />}>       
             <Route
            path="/student"
            element={
              <PublicLayout open={open} onClick={() => setOpen(!open)}>
                <Outlet />
              </PublicLayout>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
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
            <Route path="forum/conversation" element={<ForumsComments />} />
            <Route path="calendar/view/upcoming/schedule" element={<CalenderViewUpcomingSchedule/>}/>
            <Route path="quiz/preview" element={<QuizPreview/>}/>
            <Route path="quiz" element={<Quizs/>}/>
            <Route path="student/homework" element={<StudentHomeWork/>}/>
            <Route path="homework/preview" element={<HomeWorkPreview/>}/>
            <Route path="homework/review" element={<HomeWorkReview/>}/>
            <Route path="forum" element={<Forum/>}/>
          </Route>
          </Route>
 

          {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={
              <PublicLayout open={open} onClick={() => setOpen(!open)}>
                <Outlet />
              </PublicLayout>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="course/category" element={<CourseCategory />} />
            <Route path="course/search" element={<AllCourseList />} />
            <Route path="course/lesson/edit/:id" element={<EditCourseLesson />} />
            <Route path="upcoming/schedule/list" element={<UpcomingTeacherScheduleList />} />
            <Route path="upcoming/schedule/list/:id" element={<UpcomingTeacherScheduleList/>}/>
            <Route path="course/edit/:courseID" element={<EditCourses/>}/>
            <Route path="quiz/create/:id" element={<QuizIntegration/>}/> 
            <Route path="course/lesson/:courseID" element={<CourseLesson/>}/>
            <Route path="course/schedule/:courseID" element={<CourseSchedule/>}/>
            <Route path="course/schedule/add" element={<CreateCourseSchedule/>}/>
            <Route path="course/lesson/add" element={<CreateCourseLesson/>}/>
            <Route path="students/list" element={<StudentList />} /> 
            <Route path="course/list" element={<CourseList />} />
            <Route path="teacher/list" element={<TeacherList />} />
            <Route path="forum" element={<AdminForum />} />
            <Route path="course/detail/:id" element={<CourseDetail/>}/>
            <Route path="payment/list" element={<AdminPaymentList />} />
            <Route path="course/add" element={<CoursesCreation/>}/>
            <Route path="admin/upcomeing/schedule/list" element={<AdminStudentsList/>}/>
            <Route path="teacher/profile/view" element={<TeacherPublicProfile/>}/>
            <Route path="application/details" element={<DisplayTeacherApplication />} />
            <Route path="upcoming/schedule/student/list/:id" element={<AdminUpcomingScheduleList/>} />
            <Route path="teacher/edit/:id" element={<EditTeacher/>}/>
            <Route path="set/password" element={<TeacherResetPassword/>}/>
            <Route path="teacher/not-available" element={<CalendarView/>}/>
            <Route path="teacher/schedule/:id" element={<TeacherCourseList />} />
            <Route path="calendar/view/upcoming/schedule" element={<ScheduleForCalendarView/>} />
          </Route>
          </Route>

          {/* Teacher Routes */}
             <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
                      <Route
            path="/teacher"
            element={
              <PublicLayout open={open} onClick={() => setOpen(!open)}>
                <Outlet />
              </PublicLayout>
            }
          >
            <Route index element={<Navigate to="/teacher/dashboard" />} />
            <Route path="menu" element={<WizardForm />} />
            <Route path="dashboard" element={<TeacherDashboard />}/>
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
 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
