import {useState,useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";
import cors from 'cors';



import Home from './Components/Home/Home';
import Student_register from './Components/Student_register/Student_register';
import Teacher_register from './Components/Teacher_register/Teacher_register';
import Login from './Components/Login/Login';
import Subject from './Components/Subject/Subject';
import Teacher_Dashboard from './Components/Teacher_Dashboard/Teacher_Dashboard';
import Student_Dashboard from './Components/Student_Dashboard/Student_Dashboard';
import Coordinate from './Components/Coordinate/Coordinate';
import Take_Attendance from './Components/Take_Attendance/Take_Attendance';
import Student_Attendance_View from './Components/Student_Attendance_View/Student_Attendance_View';
import Student_Attendance_Take from './Components/Student_Attendance_Take/Student_Attendance_Take';
import Teacher_Attendance_View from './Components/Teacher_Attendance_View/Teacher_Attendance_View';
import Teacher_Settings from './Components/Teacher_Settings/Teacher_Settings';

const App = () => {
  cors({credentials: true, origin: true});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher_register" element={<Teacher_register  />} />
        <Route path="/student_register" element={<Student_register  />} />
        <Route path="/login" element={<Login />} />   
        <Route path="/subject" element={<Subject />} />     
        <Route path="/teacher_dashboard" element={<Teacher_Dashboard />} />
        <Route path="/student_dashboard" element={<Student_Dashboard />} />
        <Route path="/coordinate" element={<Coordinate />} />
        <Route path="/take_attendance" element={<Take_Attendance />} />
        <Route path="/student_attendance_view" element={<Student_Attendance_View />} />
        <Route path="/student_attendance_take" element={<Student_Attendance_Take />} />
        <Route path="/teacher_attendance_view" element={<Teacher_Attendance_View />} />
        <Route path="/teacher_settings" element={<Teacher_Settings />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
