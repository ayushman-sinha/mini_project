import {useState,useEffect} from 'react'
import axios from 'axios'
import './Take_Attendance.css'


const Take_Attendance = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [startAttendance,setStartAttendance] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    const [attendanceDate, setAttendanceDate] = useState(  new Date().toLocaleDateString('en-CA'))
    const [attendance, setAttendance] = useState([])
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

    //Fire this useEffect every 10 seconds
    useEffect(() => {
        const getAttendance = async () => {
            try{
                const response = await axios.post('http://localhost:5000/api/teacher/viewAttendanceTeacher', {teacher_id: user.teacher_id, attendance_date: attendanceDate, subject_id: user.subject_id})
                   
                console.log(response.data.result[0])  
                if(response.data.result.length===0){
                    setAttendance([])                    
                }
                else
                    setAttendance(response.data.result[0].student_id)
            }
            catch(err){
                setAttendance([])
                console.log(err)
            }
        }
        setInterval(() => {
            if(startAttendance){
                getAttendance()
            }
        }, 10000);
    },[])
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
    <div className='teacher_attendance_container'>
        <h1>Take Attendance</h1>
        <strong>Date : </strong> "Date"
        <br/>
        <strong>Time : </strong> {new Date().toLocaleTimeString()}
        <br/>
        <strong>Subject : </strong> "Subject"
        <p></p>
        <button type='button'  onClick={handleChanges} className='star_stop_button'>{ startAttendance ? 'Stop Attendance' : 'Start Attendance'}</button>
        <p></p>
        {
            /*Display elapsed time for attendance */
             <h2>Elapsed Time : {elapsedTime} seconds</h2>
        }

        <p></p>
        {
            /*Display attendance table */
            attendance.length===0 ? <div>No Attendance Found</div> :
            <div>
                <table className='teacher_take_table'>
                    <thead className='teacher_heading_take'>
                    <tr className='teacher_row_take'> 
                        <th>Student USN</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendance.map((item, index) => {
                        return (
                        <tr key={index} className='teacher_row_take'>
                            <td>{item}</td>
                            <td>Present</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
                
        }
        <p></p>
        <button type='button' className='teacher_attendance_button_back' onClick={() => window.location.href = '/teacher_dashboard'}>Back</button>
         
    </div>
  )
}

export default Take_Attendance