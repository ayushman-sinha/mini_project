import {useState,useEffect} from 'react'
import axios from 'axios'
import './Student_Attendance_Take.css'


const Student_Attendance_Take = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [startAttendance, setStartAttendance] = useState(false);
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
    },[]);
    useEffect(() => {
        const getFlag = async () => {
            const res = await axios.get('http://localhost:5000/api/override/getOverride');
            console.log(res);
            if(res.data.master.attendance_override===false){
                alert("Teacher has not started the attendance yet")  
                setStartAttendance(false)  
                window.location.href = '/student_dashboard'  

            }
            else if(res.data.master.master_override===true){
                setStartAttendance(false)  
                alert("Not within the range of the classroom")                
            }
            else if(res.data.master.attendance_override===true&&res.data.master.master_override===false){
                setStartAttendance(true)  
                alert("Attendance has started")    
                return;            
            }
        }
        getFlag();
    },[]);
  return (
    <div>
        <h1>Take Attendance</h1>
        {startAttendance&&<button onClick={()=>{} }>Take Attendance</button>}
    </div>
  )
}

export default Student_Attendance_Take