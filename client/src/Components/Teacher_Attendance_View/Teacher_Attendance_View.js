import {useState,useEffect} from 'react'
import axios from 'axios'

const Teacher_Attendance_View = () => {
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
    console.log(user)
    try{
      const response = await axios.post('http://localhost:5000/api/teacher/viewAttendanceTeacher', {teacher_id: user.teacher_id, attendance_date: attendanceDate, subject_id: user.subject_id})
         
      console.log(response.data.result[0])  
      if(response.data.result.length===0){
        setAttendance([])
        alert("No Attendance Found")
      }
      else
      setAttendance(response.data.result[0].student_id)
    }
    catch(err){
      setAttendance([])
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
          <h3>Date : {attendanceDate}</h3>
           
          <table>
            <thead>
              <tr>
                <th>Student USN</th>                
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item, index) => {
                return (
                  <tr key={index}>
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
      <button onClick={()=>{window.location.href = '/teacher_dashboard'}}>Back</button>
    </div>
  )
}

export default Teacher_Attendance_View