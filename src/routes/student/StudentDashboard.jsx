import React from 'react'
import { Outlet } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div>
      <div>StudentDashboard</div> 
    <div>{<Outlet />}</div>
    </div>
  )
}

export default StudentDashboard