import React from 'react'
import { Outlet } from 'react-router-dom';

const TutorDashboard = () => {
  return (
    <div>
      <div>TutorDashboard</div>
      <div>{<Outlet/>}</div>
    </div>
    
  )
}

export default TutorDashboard