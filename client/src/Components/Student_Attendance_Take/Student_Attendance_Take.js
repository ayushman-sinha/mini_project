import { useState, useEffect } from 'react';
import axios from 'axios';
import './Student_Attendance_Take.css';

const Student_Attendance_Take = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [startAttendance, setStartAttendance] = useState(false);
  const [subject_list, setSubject_list] = useState([]);
  const [teacher, setTeacher] = useState('');

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

  useEffect(() => {
    const getFlag = async () => {
      const res = await axios.get('http://localhost:5000/api/override/getOverride');
      console.log(res);
      if (res.data.master.attendance_override === false) {
        alert("Teacher has not started the attendance yet");
        setStartAttendance(false);
        window.location.href = '/student_dashboard';
      } else if (res.data.master.master_override === true) {
        setStartAttendance(false);
        alert("Not within the range of the classroom");
      } else if (res.data.master.attendance_override === true && res.data.master.master_override === false) {
        setStartAttendance(true);
        setTeacher(res.data.master.teacher);
        alert("Attendance has started");
        return;
      }
    };
    getFlag();
  }, []);

  const handleAttendance = async () => {
    console.log("user.student_id");
    try {
      const res = await axios.post('http://localhost:5000/api/student/takeAttendance', {
        student_id: user.student_id,
        subject_id: teacher,
      });
      alert("Attendance Taken");
      window.location.href = '/student_dashboard';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="student-attendance-take">
      <h1>Take Attendance</h1>
      {startAttendance && (
        <button className="attendance-button" onClick={handleAttendance}>
          Take Attendance
        </button>
      )}
    </div>
  );
}

export default Student_Attendance_Take;
