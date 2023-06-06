import {useState,useEffect} from 'react'

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
    <div>
        <h1>Student Dashboard</h1>
        <h2>Welcome Student {user.name}</h2>
        <h3>USN : {user.student_id}</h3>
        <p></p>
        <ul>
            <li><a href='/student_attendance_view'>View Attendance</a></li>
            <li>
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