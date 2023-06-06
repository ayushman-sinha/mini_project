import {useState} from 'react'
import './Login.css'
import axios from 'axios'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password : password
    }
    try{
      const response = await axios.post('http://localhost:5000/api/auth/login',user).then((res)=>{
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        if(res.data.message === 'Student'){
          window.location.href = '/student_dashboard'
        }
        else if(res.data.message === 'Teacher'){
          window.location.href = '/teacher_dashboard'
        }
      })
      
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='main_container_login'>
        <h1>Login</h1>
        <form className='form_container_login' onSubmit={handleSubmit}>
            <label htmlFor="Email">Email</label>
            <input type="text" id="email" name="email" placeholder="Your email.." onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor ="Password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password.." onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className='submit_button_login'>Login</button>
        </form>

    </div>
  )
}

export default Login