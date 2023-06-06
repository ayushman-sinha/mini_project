import {useState,useEffect} from 'react';
import './Teacher_Dashboard.css';

const Teacher_Dashboard = () => {
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
    <div>
        <h1>Teacher Dashboard</h1>
        <h2>Welcome Teacher {user.name}</h2>
        <ul>
            <li>Add/Edit Co-ordinates</li>
            <li>View Attendance</li>
            <li>Take Attendance</li>
        </ul>
        <div className='logout_button_teacher'>
            <button onClick={()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.href = '/login'
            } }>Logout</button>
        </div>
    </div>
  )
}

export default Teacher_Dashboard