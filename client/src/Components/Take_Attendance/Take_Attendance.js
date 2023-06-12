import {useState,useEffect} from 'react'
import axios from 'axios'


const Take_Attendance = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [startAttendance,setStartAttendance] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        const getStatus = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/override/getOverride');    
               
                console.log(res.data.master.attendance_override)            
                setStartAttendance(res.data.master.attendance_override)
            }
            catch(err){
                console.log(err)
            }
        }
        const token = localStorage.getItem('token');
        if(token){
        setLoggedIn(true);
        setUser(JSON.parse(localStorage.getItem('user')));
        }
        else{
            alert("Please Login First")
            window.location.href = '/login'
        }
        getStatus()

    },[])

    useEffect(() => {
        if(startAttendance){
            const timer = setInterval(() => {
                setElapsedTime(elapsedTime => elapsedTime + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    })

    
    const handleChanges = async (e) => {
           
            e.preventDefault();
            
                try{
                    const sub = !startAttendance? user.subject_id : ''
                    const res = await axios.post('http://localhost:5000/api/override/attendance', {
                        attendance_override : !startAttendance,
                        teacher : sub,
                        
                    });
                    setStartAttendance(!startAttendance)
                }
                catch(err){
                    console.log(err)
                }
            
    }
    
  return (
    <div>
        <h1>Take Attendance</h1>
        <strong>Date : </strong> "Date"
        <br/>
        <strong>Time : </strong> {new Date().toLocaleTimeString()}
        <br/>
        <strong>Subject : </strong> "Subject"
        <p></p>
        <button type='button'  onClick={handleChanges}>{ startAttendance ? 'Stop Attendance' : 'Start Attendance'}</button>
        <p></p>
        {
            /*Display elapsed time for attendance */
             <h2>Elapsed Time : {elapsedTime} seconds</h2>
        }

    </div>
  )
}

export default Take_Attendance