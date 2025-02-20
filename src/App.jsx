import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Studentsignup from'./Components/studentsignup'
import Teachersignup from'./Components/Teachersignup'
import Studentsidebar from './Components/Core/Studentsidebar'
import Updatestudentdetail from'./Components/Editstudentdetail/Updatestudentdetail'
import UpcomingSchedule1 from './Components/Studentupcomingschedule/Upcomingschedule1'
import AllCourseList from './Components/Courselist/AllCourseList'
// import PublicFooter from './Components/PublicLayout/PublicFooter'
import List from'./Components/Favouritecourse/List'
import Quize from'./Components/ListOfQuize/Quize'
import Homework from'./Components/Homework/Homework'
import Transcript from'./Components/Studenttranscript/Transcript'
import ActiveCourses from './Components/ActiveEnroleCourses/ActiveCourses'
import Forumdetail from'./Components/Forum/Forumdetail'
import CompleteCourse from './Components/CompleteCourseList/CompleteCourse'
import CourseHistory from './Components/CourseHistory/CourseHistory'
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Studentsignup' element={<Studentsignup />} />
          <Route path='Teachersignup' element={<Teachersignup />} />
          <Route path='Studentsidebar' element={<Studentsidebar />} />
          <Route path='/Updatestudentdetail' element={<Updatestudentdetail />} />
          <Route path='/Upcomingschedule1' element={<UpcomingSchedule1 />} />
          <Route path='AllCourseList' element={<AllCourseList />} />
       <Route path='List' element={<List />} />
        <Route path='Quize' element={<Quize />} /> 
        <Route path='Homework' element={<Homework />} /> 
        <Route path='Transcript ' element={<Transcript />} /> 
        <Route path='ActiveCourses' element={<ActiveCourses />} /> 
        <Route path='Forumdetail' element={<Forumdetail />} />
        <Route path='CompleteCourse' element={<CompleteCourse />} />
        <Route path='CourseHistory' element={<CourseHistory />} />
        </Routes>
      
    </BrowserRouter>
  
  )
}

export default App