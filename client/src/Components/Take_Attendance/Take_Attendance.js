import { useState, useEffect } from 'react';
import axios from 'axios';
import './Take_Attendance.css';

const Take_Attendance = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [startAttendance, setStartAttendance] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/override/getOverride');
        setStartAttendance(res.data.master.attendance_override);
      } catch (err) {
        console.log(err);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      alert('Please Login First');
      window.location.href = '/login';
    }

    getStatus();
  }, []);

  useEffect(() => {
    if (startAttendance) {
      const timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startAttendance]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return date.toLocaleTimeString([], options);
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString([], options);
  };

  const handleChanges = async (e) => {
    e.preventDefault();
  
    try {
      const sub = !startAttendance ? user.subject_id : '';
      const res = await axios.post('http://localhost:5000/api/override/attendance', {
        attendance_override: !startAttendance,
        teacher: sub,
      });
      setStartAttendance(!startAttendance);
      if (!startAttendance) {
        setElapsedTime(0); // Reset the elapsed time to 0 when attendance is stopped
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="take-attendance">
      <h1>Take Attendance</h1>
      <div className="date-time">
        <div className="date">
          <strong>Date:</strong> {formatDate(currentTime)}
        </div>
        <div className="time">
          <strong>Time:</strong> {formatTime(currentTime)}
        </div>
      </div>
      <strong>Subject:</strong> "Subject"
      <p></p>
      <button className="attendance-button" type="button" onClick={handleChanges}>
        {startAttendance ? 'Stop Attendance' : 'Start Attendance'}
      </button>
      <p></p>
      {startAttendance && <h2>Elapsed Time: {elapsedTime} seconds</h2>}
    </div>
  );
};

export default Take_Attendance;
