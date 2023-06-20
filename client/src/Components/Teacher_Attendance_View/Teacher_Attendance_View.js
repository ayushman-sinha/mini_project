import {useState,useEffect} from 'react'
import axios from 'axios'
import './Teacher_Attendance_View.css'
import xlsx from "json-as-xlsx"

const Teacher_Attendance_View = () => {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [user, setUser] = useState({})
  const [attendance, setAttendance] = useState([])
  const [attendanceDate, setAttendanceDate] = useState(  new Date().toLocaleDateString('en-CA'))
  const [newAttendance, setNewAttendance] = useState([])
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
    
    try{
      const response = await axios.post('http://localhost:5000/api/teacher/viewAttendanceTeacher', {teacher_id: user.teacher_id, attendance_date: attendanceDate, subject_id: user.subject_id})
         
      console.log(response.data.result[0])  
      if(response.data.result.length===0){
        setAttendance([])
        alert("No Attendance Found")
      }
      else{
      setAttendance(response.data.result[0].student_id)
        let arr=[]
      for(let i=1;i<=70;i++){
          let usn='1SI20IS'+i.toString().padStart(3,'0')
          if(!response.data.result[0].student_id.includes(usn)){
            arr.push({
              student_id: usn,
              status: "Absent"
            })
          }
          else{
            arr.push({
              student_id: usn,
              status: "Present"
            })
          }
      }
      console.log(arr)
      setNewAttendance(arr)
    }
    }
    catch(err){
      setAttendance([])
      console.log(err)
    }

  }
  const downloadExcel = () => {
    let data = [
      {
        sheet : "Sheet 1",
        columns : [
          { label : "Student USN", value : "student_id" },
          { label : "Status", value : "status" }
        ],
        content : [
          ...newAttendance.map((item, index) => {
            return { student_id: item.student_id, status: item.status }
          })
        ]

      }
    ]
    
    let settings = {
      fileName: "MySpreadsheet", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options     
    }
    
    xlsx(data, settings) 
  }
  return (
    <div className='container_teacher_view'>
      <div className='date-picker '>Seletct Date : </div>
      <input type="date"  value={attendanceDate} onChange={(e)=>{ console.log(e.target.value);setAttendanceDate(e.target.value)}} className='date_input'></input>
      <button onClick={handleSubmit} className='submit_button'>Submit</button>
      
      <p></p>
      {attendance.length===0 ? <div>No Attendance Found</div> :
        <div>
          <h3>Date : {attendanceDate}</h3>
           
          <table className='teacher_table'>
            <thead className='teacher_table_heading'>
              <tr className='teacher_table_row'>
                <th>Student USN</th>                
                <th>Status</th>
              </tr>
            </thead>
            <tbody className='table_body_teacher'>
              {newAttendance.map((item, index) => {
                return (
                  <tr key={index} className='teacher_table_row'>
                    <td>{item.student_id}</td>
                    <td style={{color: item.status==="Present" ? "green" : "red"}}>{item.status}</td>
                  </tr>
                )
                
              })}
                
             
            </tbody>
          </table>
        </div> 
      }
      <p></p>
      <button onClick={()=>{window.location.href = '/teacher_dashboard'}} className='back_button'>Back</button>
      {attendance.length===0 ? <div></div> : 
        <button onClick={downloadExcel} className='download_button'>Download</button>
      }
    </div>
  )
}

export default Teacher_Attendance_View