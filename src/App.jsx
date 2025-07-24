import React from 'react'
import { useAuth } from './context/AuthContext';
import Navbar from "./components/student/Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/student/Home";
import Signup from "./routes/student/Signup";
import Login from './routes/student/Login';
import StudentDashboard from "./routes/student/StudentDashboard";
import StudentAllCourses from "./routes/student/StudentAllCourses";
import Player from "./routes/student/Player";
import Settings from "./routes/student/Settings";
import Tutor from './routes/tutor/Tutor';
import TutorDashboard from "./routes/tutor/TutorDashboard";
import CourseBuilder from "./routes/tutor/CourseBuilder";
import TutorAllCourses from "./routes/tutor/TutorAllCourses";


function App() {
  const {loading, currentUser} = useAuth();

  if(loading) {
      return (
    <div>Loading...</div>
  );
  }

  return (
    <>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/student-all-courses' element={<StudentAllCourses />} />
        <Route path='/player' element={<Player />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/tutor' element={<Tutor />}>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<TutorDashboard />} />
            <Route path='course-builder' element={<CourseBuilder />} />
            <Route path='all-courses' element={<TutorAllCourses />} />
            <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </div>
    </>
  )

}

export default App