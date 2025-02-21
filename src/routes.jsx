import LandingPage from "./Components/LandingPage.jsx";
import Admindashboard from './Components/Dashboard/Admindashboard.jsx'
import Dashboard from "./Components/Dashboard.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import Login from "./Components/Login.jsx";
import CourseCategory from "./Components/CourseCategory/Index.jsx";
import CourseSearch from "./Components/AllCourseList/Index.jsx";
// import Home from "./Components/Home.jsx";

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
        path: "/dashboard",
        exact: true,
        name: "Dashboard",
        component: Dashboard,
      },
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
  path:"/admin/coursesearch",
  exact:true,
  name:"CourseSearch",
  component:CourseCategory,
 },
 {
  path:"/admin/upcoming/schedule",
  exact:true,
  name:"UpcomingSchedule",
  component:UpcomingSchedule,
 },
 {
  path:"/admin/students",
  exact:true,
  name:"Students",
  components:
 }
]
export default routes;