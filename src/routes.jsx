import LandingPage from "./Components/LandingPage.jsx";
import Admindashboard from './Components/Dashboard/Admindashboard.jsx'
import Dashboard from "./Components/Dashboard.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import Login from "./Components/Login.jsx";
import SubmitPassword from './Components/SubmitPassword/Index.jsx'
import CourseCategory from "./Components/CourseCategory/Index.jsx";
import ResetPassword from "./Components/ResetPassword/Password.jsx";
import AllCourseList from "./Components/CourseList/AllCourseList.jsx";
import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index.jsx";
import StudentList from "./Components/AdminStudentList/Index.jsx";
import UpcomingSchedule1 from "./Components/Studentupcomingschedule/Upcomingschedule1.jsx"
import CourseList from "./Components/Courselist/Index.jsx";
import TeacherList from "./Components/TeacherList/Index.jsx";
import CoursesCreation from "./Components/Course/CourseCreation.jsx";
import AdminForum from "./Components/Forum/AdminForum.jsx";
import AdminPaymentList from "./Components/AdminPaymentList/Index.jsx";
import { components } from "react-select";
import StudentDashboard from "./Components/Dashboard/Studentdashboard.jsx";
import { HomeWork, Quiz } from "@mui/icons-material";
import ActiveCourses from "./Components/ActiveEnroleCourses/ActiveCourses.jsx";
import CompleteCourse from "./Components/CompleteCourseList/CompleteCourse.jsx";
import CourseHistory from "./Components/CourseHistory/CourseHistory.jsx";
// import Home from "./Components/Home.jsx";
import TeacherCourseList from "./Components/TeacherCourseList/Index.jsx";
import TeacherProfile from "./Components/TeacherProfile/Index.jsx";
import List from "./Components/Favouritecourse/List.jsx";
import Forumdetail from "./Components/Forum/Forumdetail.jsx";
import Transcript from "./Components/Studenttranscript/Transcript.jsx";

// import UpcomingTeacherScheduleList from "./Components/UpcomingTeacherScheduleList/Index.jsx";
import TeacherQuizReview from "./Components/TeacherQuizeReview/Index.jsx";
import TeacherHomeworkReview from "./Components/TeacherHomeWorkReview/Index.jsx";
import TeacherAvailable from "./Components/TeacherAvailablity/Index.jsx";
import ForumSelect from "./Components/Forum/Forumdetail.jsx";
import TeacherPayment from "./Components/TeacherPayment/TeacherPayment.jsx";
import DisplayTeacherApplication from "./Components/TeacherApplication/DisplayAplication.jsx";
import { Component } from "react";
import CoursesCreation from "./Components/Course/CourseCreation.jsx";
const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Home",
  //   component: Home,
  // },
    {
      path: "/home",
      exact: true,
      name: "LandingPage",
      component: LandingPage,
    },
    {
        path: "/login",
        exact: true,
        name: "Login",
        component: Login,
      },
      {
        path:"/forget/password",
        exact:true,
        name:"Resetpassword",
        Component:"Resetpassword",
      },
      {
        path:"/password/change",
        exact:true,
        name:"Submitpassword",
        Component:"Submitpassword",
      },
      {
        path: "/dashboard",
        exact: true,
        name: "Dashboard",
        component: Dashboard,
      },
      // admin routes
      {
        path: "/admin/login",
        exact: true,
        name: "AdminLogin",
        component: AdminLogin,
      },
    {
    path:"/admin/dashboard",
    exact:true,
    name:"Admindashboard",
    component:Admindashboard,
   },
   {
    path:"/admin/coursecategory",
    exact:true,
    name:"CourseCategory",
    component:CourseCategory,
   },
 {
  path:"/admin/course/search",
  exact:true,
  name:"AllCourseList",
  component:AllCourseList,
 },
 {
  path:"/admin/upcoming/schedule/list",
  exact:true,
  name:"UpcomingTeacherScheduleList",
  component: UpcomingTeacherScheduleList,
 },
 {
  path:"/admin/students/list",
  exact:true,
  name:"StudentList",
  components:StudentList,
 },
 {
  path:"admin/course/list",
  exact:true,
  name:"CourseList",
  component:CourseList
 },
 {
  path:"/admin/teacher/list",
  exact:true,
  name:"TeacherList",
  component:TeacherList
 },
 {
  path:"/admin/forum",
  exact:true,
  name:"AdminForum",
  component:AdminForum
 },
 {
  path:"/admin/payment/list",
  exact:true,
  name:"AdminPaymentList",
  component:AdminPaymentList
 },
 {
  path:"/admin/course/add",
  exact:true,
  name:CoursesCreation
 },
//  student routes
{
  path:"/student/dashboard",
  exact:true,
  name:"StudentDashboard",
  component:StudentDashboard
},
// {
//   path:"/student/update/detail",
//   exact:true,
//   name:"Updatestudentdetail",
//   component:Updatestudentdetail
// },
{
  path:"/student/upcoming/schedule1",
  exact:true,
  name:"UpcomingSchedule1",
  component: UpcomingSchedule1
},
{
  path:"/student/allcourselist",
  exact:true,
  name:"AllCousrseList",
  component:AllCourseList
},
{
  path:"/student/list",
  exact:true,
  name:"List",
  component:List
},
{
  path:"/student/quiz",
  exact:true,
  name:"Quiz",
  component:Quiz
},
{
  path:"/student/homework",
  exact:true,
  name:"Homwork",
  component:HomeWork
},
{
  path:"/student/transcript",
  exact:true,
  name:"Transcript",
  component:Transcript
},
{
  path:"/student/activecoutses",
  exact:true,
  name:"AcxtiveCourses",
  component:ActiveCourses,
},
{
  path:"/student/forum/detail",
  exact:true,
  name:"Forumdetail",
  component:Forumdetail,
},
{
  path:"/student/completecourse",
  exact:true,
  name:"CompleteCourse",
  component:CompleteCourse,
},
{
  path:"/student/completecourse",
  exact:true,
  name:"CourseHistory",
  component:CourseHistory,
},
// teacher
{
  path:"/teacher/profile",
  exact:true,
  name:"TeacherProfile",
  component:TeacherProfile,
},
{
  path:"/teacher/schedule",
  exact:true,
  name:"TeacherCourseList",
  component:TeacherCourseList,
},
{
  path:"/teacher/upcoming/schedule/list",
  exact:true,
  name:"UpcomingTeacherScheduleList",
  component: UpcomingTeacherScheduleList,
},
{
  path:"/teacher/review/quiz",
  exact:true,
  name: "TeacherQuizReview",
  component: TeacherQuizReview,
},
{
  path: "/teacher/review/homework",
  exact: true,
  name: "TeacherHomeworkReview",
  component: TeacherHomeworkReview,
},
{
  path: "/teacher/not-available/time",
  exact: true,
  name: "TeacherAvailable",
  component: TeacherAvailable,
},
{
  path: "/teacher/forum/details",
  exact: true,
  name: "ForumSelect",
  component: ForumSelect,
},
{
  path: "/teacher/payments",
  exact: true,
  name: "TeachePayment",
  component: TeacherPayment,
},
{
  path: "/teacher/application/details",
  exact: true,
  name: "DisplayTeacherApplication",
  component: DisplayTeacherApplication,
},
]
export default routes;