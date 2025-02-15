import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
// import Dashboard from './components/Dashboard'
// import LandingPage from './Components/LandingPage'
// import Admin from './Components/Admin'
// import Teacher from './Components/Teacher'
// import Student from './Components/Student'
import StudentDashboard from './Components/Dashboard/Studentdashboard'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='StudentDashboard' element={<StudentDashboard />} />
            {/* <Route path='/' element={<LandingPage />} />
            <Route path='dashBoard' element={<Dashboard />} />
            <Route path='admin' element={<Admin />} />
            <Route path='teacher' element={<Teacher />} />
            <Route path='student' element={<Student />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App