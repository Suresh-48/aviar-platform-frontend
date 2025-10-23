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
import AboutUs from "./Components/AboutUs/Index.jsx";
import { HomeWork, Quiz } from "@mui/icons-material";
import NavbarLoginBefore from "./Components/PublicLayout/navbar";
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
import ChatBotConversation from "./Components/ChatBotConversation/ChatBotConversation.jsx";
import EditCourses from "./Components/EditCourses/Index.jsx";
import CourseLesson from "./Components/CourseLesson/Index.jsx";
import CoursesCreation from "./Components/Course/CourseCreation.jsx";
import CreateCourseLesson from "./Components/CourseLesson/CreateCourseLesson.jsx";
import CreateCourseSchedule from "./Components/CourseSchedule/CreateCourseSchedule.jsx";
import CourseSchedule from "./Components/CourseSchedule/Index.jsx";
import EditCourseSchedule from "./Components/CourseSchedule/EditCourseSchedule.jsx";
import CourseDetail from "./Components/Course/CourseDetail.jsx";
const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/admin/course/lesson",
    exact: true,
    name: "CourseLesson",
    component: CourseLesson,
  },
  
    {
      path: "/admin/course/detail",
      exact: true,
      name: "CourseDetail",
      component: CourseDetail,
    },
  
    {
      path: "/admin/course/checkout",
      exact: true,
      name: "CourseCheckout",
      component: CourseCheckout,
    },
  
    {
      path: "/home",
      exact: true,
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path:"/chatbot",
      exact:true,
      name:"ChatBotConversation",
      component:ChatBotConversation,
    },
    {
      path: "/course/schedule",
      exact: true,
      name: "CourseSchedule",
      component: CourseSchedule,
    },
    {
      path:"/navbar",
      exact:true,
      name:"NavbarLoginBefore",
      component:NavbarLoginBefore,
    },
    {
      path:"/about-us",
      exact:true,
      component:AboutUs
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
    path:"/admin/course/category",
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
//  {
//   path: "/course/edit/:id",
//   exact: true,
//   name: "EditCourses",
//   component: EditCourses,
// },
{
  path:"/admin/course/edit/1",
  exact:true,
  name:EditCourses,
},
 {
  path:"/admin/course/list",
  exact:true,
  name:"CourseList",
  component:CourseList
 },
 
  {
    path: "/admin/course/schedule",
    exact: true,
    name: "CourseSchedule",
    component: CourseSchedule,
  },
  {
    path: "/admin/course/schedule/add",
    exact: true,
    name: "CreateCourseSchedule",
    component: CreateCourseSchedule,
  },
  {
    path:"/admin/course/schedule/update",
    exact:true,
    name:"EditCourseSchedule",
    component: EditCourseSchedule,
  },
 {
  path: "/admin/course/lesson/add",
  name:"CreateCourseLesson",
  component:CreateCourseLesson,
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
{
  path:"/student/update/detail",
  exact:true,
  name:"Updatestudentdetail",
  component:Updatestudentdetail
},
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