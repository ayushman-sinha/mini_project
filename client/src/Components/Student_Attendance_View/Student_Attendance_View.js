import {useState,useEffect} from 'react'
import axios from 'axios'
import './Student_Attendance_View.css';

// import './Student_Attendance_View.css'
const Student_Attendance_View = () => {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [user, setUser] = useState({})
  const [attendance, setAttendance] = useState([])
  const [attendanceDate, setAttendanceDate] = useState(  new Date().toLocaleDateString('en-CA'))
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      setIsLoggedin(true)
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    else{
      alert("Please Login First")
      window.location.href = '/login'
    }

  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.log(user)
    try{
      const response = await axios.post('http://localhost:5000/api/student/viewAttendance', {student_id: user.student_id, attendance_date: attendanceDate})   
      console.log(response.data)  
      if(response.data.result.length===0){
        setAttendance([])
        alert("No Attendance Found")
      }
      
      setAttendance(response.data.result)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div>Seletct Date : </div>
      <input type="date"  value={attendanceDate} onChange={(e)=>{ console.log(e.target.value);setAttendanceDate(e.target.value)}}></input>
      <button onClick={handleSubmit}>Submit</button>
      <p></p>
      {attendance.length===0 ? <div>No Attendance Found</div> : 
        <div>        
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item, index) => {              
                return (
                  <tr key={index}>
                    <td>{item.subject_id}</td>
                    <td>{item.attendance_date}</td>
                    <td>Present</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      }
      
    </div>
      
  )
}

export default Student_Attendance_View