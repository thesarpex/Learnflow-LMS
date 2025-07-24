import React from 'react'
import { Outlet } from 'react-router-dom'

const Tutor = () => {
  return (
    <div>
        <div>Tutor</div>
        <div>{<Outlet />}</div>
    </div>
    
  )
}

export default Tutor