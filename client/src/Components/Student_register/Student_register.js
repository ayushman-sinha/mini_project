import {useState,useEffect} from 'react'
import './Student_register.css'
import axios from 'axios'


const Student_register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [student_id,setStudent_id] = useState('')
  const [isAdmin,setIsAdmin] = useState(false)
  const handleSubmit = async (e) =>{
      e.preventDefault() 
      const res1 = await fetch('http://localhost:5000/api/subject/get_subjects')
      const data1 = await res1.json()
      
      console.log( student_id, name, email, isAdmin)
      if(!name || !email || !password || !student_id){
          alert('Please fill all the fields')
          return
      }
     

      const res = await axios.post('http://localhost:5000/api/auth/student/register', {student_id, name, email, subject_list: data1, isAdmin, password})
      alert(res.data.message)
      window.location.reload()
  }

  return (
    <div className='main_container_student_register'>
        <h1>Student Registration </h1>
        <form className='form_container_student_registration' onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name.." onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="Email">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email.." onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="usn">USN</label>
            <input type="text" id="usn" name="usn" placeholder="Your USN.." onChange={(e)=>setStudent_id(e.target.value)}/>
            <label htmlFor ="Password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password.." onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" value="Submit"/>
            
        </form>
            
    </div>
  )
}

export default Student_register