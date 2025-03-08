import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Login from './Components/Login.jsx'
// import LandingPage from './Components/LandingPage.jsx'
import TeacherQuizReview from './Components/TeacherQuizeReview/Index.jsx'
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx'
import App from './App.jsx'
import Password from './Components/ResetPassword/Password.jsx'
import ChangePassword from './Components/SubmitPassword/Index.jsx'
import CourseCategory from './Components/CourseCategory/Index.jsx'
// import Adminsidebar from './Components/Core/Adminsidebar.jsx';
// import DashboardTiles from './Components/Core/DashboardTiles.jsx'
// import PublicFooter from './Components/PublicLayout/PublicFooter.jsx'
// import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx'
// import Studentsidebar from './Components/Core/Studentsidebar.jsx'
// import Index from './Components/Courselist/Index.jsx'
// import TeacherAvailable from './Components/TeacherAvailablity/Index.jsx'
// import CourseSchedule from'./Components/AdminSchedule/CourseSchedule.jsx'
// import CoursesCreation from './Components/Course/CourseCreation.jsx'
// import Studentdashboard from './Components/Dashboard/Studentdashboard.jsx'
// import UpcomingTeacherScheduleList from'./Components/UpcomingTeacherScheduleList/Index.jsx'
// import TableIcons from './Components/Core/TableIcons.jsx'
// import AllCourseList from './Components/Courselist/AllCourseList.jsx'
// import AdminStudentList from './Components/AdminStudentList/Index.jsx'
// import Admindashboard from './Components/Dashboard/Admindashboard.jsx'
// import DashboardTiles from './Components/core/DashboardTiles.jsx'
//  import UpcomingSchedule from './Components/Studentupcomingschedule/Upcomingschedule1.jsx'
// import Studentsignup from './Components/Studentsignup.jsx'
// import Teachersignup from './Components/Teachersignup.jsx'
// import Login from './Components/Login.jsx'
createRoot
(document.getElementById('root')).render(
  <StrictMode> 
  <App/>
  </StrictMode>,
)
