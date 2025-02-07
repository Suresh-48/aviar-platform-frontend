import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Login from './Components/Login.jsx'
import LandingPage from './Components/LandingPage.jsx'
// import DashboardTiles from './Components/Core/DashboardTiles.jsx'
import PublicFooter from './Components/PublicLayout/PublicFooter.jsx'
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx'
import Studentsidebar from './Components/Core/Studentsidebar.jsx'
// import Index from './Components/Courselist/Index.jsx'
import CourseCreation from './Components/Course/CourseCreation.jsx'
import Studentdashboard from './Components/Dashboard/Studentdashboard.jsx'
import Updatestudentdetail from './Components/Editstudentdetail/Updatestudentdetail.jsx'
import Upcomingschedule from './Components/Studentupcomingschedule/Upcomingshedule.jsx'
import Upcomingschedule1 from './Components/Studentupcomingschedule/Upcomingschedule1.jsx'
import Forumdetail from './Components/Forum/Forumdetail.jsx'
import CourseList from './Components/Courselist/Index.jsx'
// import Admindashboard from './Components/Dashboard/Admindashboard.jsx'
// import DashboardTiles from './Components/core/DashboardTiles.jsx'

// import Studentsignup from './Components/Studentsignup.jsx'
// import Teachersignup from './Components/Teachersignup.jsx'
// import Login from './Components/Login.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Upcomingschedule1/>
    {/* <Forumdetail/> */}
  </StrictMode>,
)

