import {useEffect, useState} from 'react'
import './Teacher_register.css'
import axios from 'axios'


const Teacher_register = () => {
    const [name,setName] = useState('')
    const [subject,setSubject] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [teacher_id,setTeacher_id] = useState('')
    const [isAdmin,setIsAdmin] = useState(true)
    const [subject_list,setSubject_list] = useState([])



    useEffect(()=>{
            const getSubject = async () =>{
                const res = await fetch('http://localhost:5000/api/subject/get_subjects')
                const data = await res.json()
                console.log(data)
                setSubject_list(data)
            }
            getSubject()
    },[])
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setTeacher_id(Math.floor(Math.random() * 1000000000))
        console.log( teacher_id, name, email, subject, isAdmin)
        if(!name || !subject || !email || !password || !teacher_id){
            alert('Please fill all the fields')
            return
        }
        const res = await axios.post('http://localhost:5000/api/auth/teacher/register', {teacher_id, name, email, subject_id: subject, isAdmin, password})
        alert(res.data.message)
        window.location.reload()
    }

  return (
    <div className='main_container_teacher_register'>
        <h1>Teacher Registration </h1>
        <form className='form_container_teacher_registration' onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name.." onChange={(e)=>setName(e.target.value)}/>
            <label for="subject">Subject</label>
            {<select id="subject" name="subject" onChange={(e)=>setSubject(e.target.value)}>
                {subject_list.map((subject)=>{ 
                    return <option value={subject._id} key={subject._id}>{subject.name}</option>
                })}
             </select>}
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email.." onChange={(e)=>setEmail(e.target.value)}/>
            <label for ="Password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password.." onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default Teacher_register