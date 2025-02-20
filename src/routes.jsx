import LandingPage from "./Components/LandingPage.jsx";
import Admindashboard from './Components/Dashboard/Admindashboard.jsx'
import Dashboard from "./Components/Dashboard.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import Login from "./Components/Login.jsx";
// import Home from "./Components/Home.jsx";

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Home",
  //   component: Home,
  // },
    {
      path: "/",
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
        path: "/admin-login",
        exact: true,
        name: "AdminLogin",
        component: AdminLogin,
      },
   {
    path:"admindashboard",
    exact:true,
    name:"Admindashboard",
    component:Admindashboard,
   },
   {
    path:"/"
   }
 
]
export default routes;