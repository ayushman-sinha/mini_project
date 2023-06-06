import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='main_container_home'>
        <ul className='Initial_Nav'>
            <li><a href='/teacher_register'>Teacher Registration</a></li>
            <li><a href='/student_register'>Student Registration</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/subject">Add Subject</a></li>
           
            
        </ul>
    </div>
  )
}

export default Home