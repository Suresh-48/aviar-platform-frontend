import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Admindashboard from './Components/Dashboard/Admindashboard.jsx';
import Login from './Components/Login.jsx';
import Studentsignup from './Components/studentsignup.jsx'
import Teachersignup from './Components/Teachersignup.jsx'
import CourseCategory from './Components/CourseCategory/Index.jsx';
import AllCourseList from "./Components/CourseList/AllCourseList.jsx";
import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index.jsx";
import StudentList from "./Components/AdminStudentList/Index.jsx";
import CourseList from "./Components/Courselist/Index.jsx";
import Adminsidebar from './Components/Core/Adminsidebar.jsx';
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
// import HeaderNavbar from "./Components/Core/HeaderNavbar";

// import PublicFooter from "./Components/PublicLayout/PublicFooter.jsx";
// import SidebarSetup from './Components/PublicLayout/SidebarSetup.jsx';

const App = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar pauseOnHover={false} toastClassName="toastRequestSuccess" bodyClassName="toastBody" closeButton={false} />
      <BrowserRouter>
     
        <Adminsidebar />

        <Routes>
          
          

          <Route path="/" element={<LandingPage />} />



          <Route path="/dashboard" element={<Dashboard />} /> 
          {/* <Route path="/admin/dashboard" element={<SidebarSetup/>} /> */}
          <Route path="/admin/dashboard" element={<Admindashboard/>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/student/signup" element={<Studentsignup/>} />
          <Route path ='/teacher/signup' element={<Teachersignup/>} />
          <Route path="/admin/coursecategory" element={<CourseCategory />} />
          <Route path="/admin/coursesearch" element={<AllCourseList />} />
          <Route path="/admin/upcoming/schedule" element={<UpcomingTeacherScheduleList />} />
          <Route path="/admin/students/list" element={<StudentList />} />
          <Route path="/admin/course/list" element={<CourseList />} />
          <Route path="/admin/teacher/list" element={<TeacherList />} />
          <Route path="/admin/forum" element={<AdminForum />} />
          <Route path="/admin/payment/list" element={<AdminPaymentList />} />
          {/* <Route path="/header" element={<HeaderNavbar/>}/> */}
          {/* student sidebar */}
          <Route path="/student/dashboard" element={ <StudentDashboard/> } />
          
          {/* element={<StudentDashboard />} /> */}
          <Route path="/student/update/detail" element={<Updatestudentdetail />} />
          <Route path="/student/upcoming/schedule1" element={<UpcomingSchedule1 />} />
          <Route path="/student/allcourselist" element={<AllCourseList />} />
          <Route path="/student/list" element={<List />} />
          <Route path="/student/quiz" element={<Quiz />} />
          <Route path="/student/homework" element={<Homework />} />
          <Route path="/student/transcript" element={<Transcript />} />
          <Route path="/student/activecourses" element={<ActiveCourses />} />
          <Route path="/student/forum/detail" element={<Forumdetail />} />
          <Route path="/student/completecourse" element={<CompleteCourse />} />
          <Route path="/student/course/history" element={<CourseHistory />} />
          {/* <Route path="./student" */}
          {/* teacher sidebar */}
          <Route path="/teacher/courselist" element={<TeacherCourseList />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/upcoming/schedule" element={<UpcomingTeacherScheduleList />} />
          <Route path="/teacher/quiz/review" element={<TeacherQuizReview />} />
          <Route path="/teacher/homework/review" element={<TeacherHomeworkReview />} />
          <Route path="/teacher/available" element={<TeacherAvailable />} />
          <Route path="/teacher/forum/select" element={<ForumSelect />} />
          <Route path="/teacher/payment" element={<TeacherPayment />} />
          <Route path="/teacher/application/details" element={<DisplayTeacherApplication />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
};

export default App;
