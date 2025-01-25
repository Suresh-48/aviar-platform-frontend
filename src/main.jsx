import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Studentdashboard from './Components/Dashboard/Studentdashboard.jsx'
// import Studentsignup from './Components/Studentsignup.jsx'
// import Teachersignup from './Components/Teachersignup.jsx'
// import Login from './Components/Login.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Studentdashboard/>
  </StrictMode>,
)
