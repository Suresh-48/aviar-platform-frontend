import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Studentsignup from'./Components/studentsignup'
import Teachersignup from'./Components/Teachersignup'
import Studentsidebar from './Components/Core/Studentsidebar'
import Updatestudentdetail from'./Components/Editstudentdetail/Updatestudentdetail'
import UpcomingSchedule1 from './Components/Studentupcomingschedule/Upcomingschedule1'
import AllCourseList from './Components/Courselist/AllCourseList'
import PublicFooter from './Components/PublicLayout/PublicFooter'
// import Admindashboard from'./Components/Dashboard/AdminDashboard'
// import Dashboard from './components/Dashboard'
// import LandingPage from './Components/LandingPage'
// import Admin from './Components/Admin'
// import Teacher from './Components/Teacher'
// import Student from './Components/Student'
// import StudentDashboard from './Components/Dashboard/Studentdashboard'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='Studentsignup' element={<Studentsignup />} />
          <Route path='Teachersignup' element={<Teachersignup />} />
          <Route path='Studentsidebar' element={<Studentsidebar />} />
          <Route path='/Updatestudentdetail' element={<Updatestudentdetail />} />
          <Route path='/Upcomingschedule1' element={<UpcomingSchedule1 />} />
          <Route path='AllCourseList' element={<AllCourseList />} />
          {/* <Route path='Admindashboard' element={<Admindashboard />} /> */}
            {/* <Route path='/' element={<LandingPage />} />
            <Route path='dashBoard' element={<Dashboard />} />
            <Route path='admin' element={<Admin />} />
            <Route path='teacher' element={<Teacher />} />
            <Route path='student' element={<Student />} /> */}
            
        </Routes>
        <PublicFooter />
    </BrowserRouter>
  
  )
}

export default App