import {useState,useEffect} from 'react'
import axios from 'axios'
import './Student_Dashboard.css'

const Student_Dashboard = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
        setLoggedIn(true);
        setUser(JSON.parse(localStorage.getItem('user')));
        }
        else{
            alert("Please Login First")
            window.location.href = '/login'
        }
    },[])
  return (
    <div className='student_dashboard_container'>
        <h1>Student Dashboard</h1>
        <h2>Welcome Student {user.name}</h2>
        <h3>USN : {user.student_id}</h3>
        <p></p>
        <ul className='list_student_dashboard'>
            <li className='li_element_student_dashboard'><a href='/student_attendance_view'>View Attendance</a></li>
            <li className='li_element_student_dashboard'>
                <a href='/student_attendance_take'>Take Attendance</a>
            </li>
        </ul>
        

        <div className='logout_button_student'>
            <button onClick={()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.href = '/login'
            } }>Logout</button>
        </div>
    </div>

  )
}

export default Student_Dashboard