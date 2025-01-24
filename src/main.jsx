import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Components/Login.jsx'
import LandingPage from './Components/LandingPage.jsx'
import DashboardTiles from './Components/Core/DashboardTiles.jsx'
import PublicFooter from './Components/PublicLayout/PublicFooter.jsx'
import TeacherDashboard from './Components/Dashboard/TeacherDashboard.jsx'
import Studentsidebar from './Components/Core/Studentsidebar.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Studentsidebar
  />
  </StrictMode>,
)
