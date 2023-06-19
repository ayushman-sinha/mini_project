import { useState, useEffect } from 'react';
import './Student_Dashboard.css';

const StudentDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      alert('Please Login First');
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <h2 className="welcome-message">Welcome Student {user.name}</h2>
      <h3 className="usn">USN: {user.student_id}</h3>
      <p></p>
      <ul className="dashboard-menu">
        <li>
          <a href="/student_attendance_view">View Attendance</a>
        </li>
        <li>
          <a href="/student_attendance_take">Take Attendance</a>
        </li>
      </ul>

      <div className="logout-button">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
