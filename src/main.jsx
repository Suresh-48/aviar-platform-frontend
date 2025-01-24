import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Studentdashboard from './Components/Dashboard/Studentdashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Studentdashboard />
  </StrictMode>,
)
