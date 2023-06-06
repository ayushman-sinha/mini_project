import {useState} from 'react'
import axios from 'axios'
import './Subject.css'

const Subject = () => {
    const [subject_id,setSubject_id] = useState('')
    const [name,setName] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
        const subject = {
            subject_id: subject_id,
            name: name,
        }
        console.log(subject)
        try{
            axios.post('http://localhost:5000/api/subject/register',subject)
            .then(res=>console.log(res.data))
            alert("Subject Added Successfully")
            
        }
        catch(err){
            console.log(err)
            alert("Subject ID already exists")
        }
        
    }
  return (
    <div className='main_container_subject'>
        <h1> Add Subject</h1>
        <form className='form_container_subject' onSubmit={handleSubmit}>
            <label htmlFor="subject_id">Subject ID</label>
            <input type="text" id="subject_id" name="subject_id" placeholder="Subject ID.." onChange={(e)=>setSubject_id(e.target.value)}/>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Subject name.." onChange={(e)=>setName(e.target.value)}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

export default Subject