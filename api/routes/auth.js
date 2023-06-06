const router = require('express').Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const Attendance = require('../models/Attendance');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Student Registration
router.post('/student/register', async (req, res) => {
    try{
        const { student_id, name, email, subject_list, isAdmin } = req.body;
        console.log(req.body);
        if(!student_id || !name || !email || !subject_list){
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const salt= await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const student = new Student({ student_id, name, email, subject_list, isAdmin, password });
        await student.save();
        res.status(201).json({ message: "Student Registered Successfully" });

    }
    catch(err){
        res.status(500).json({ error: "Failed to register" });
    }
});

// Teacher Registration
router.post('/teacher/register', async (req, res) => {
    try{
        const { teacher_id, name, email, subject_id, isAdmin} = req.body;
        
        if(!teacher_id || !name || !email || !subject_id){
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const salt= await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const teacher = new Teacher({ teacher_id, name, email, subject_id, isAdmin, password });
       // console.log(teacher);
        await teacher.save();
        res.status(201).json({ message: "Teacher Registered Successfully" });

    }
    catch(err){
        res.status(500).json({ error: "Failed to register" });
    }
});

//Login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    
   
    try {
      // Search for a student with the given email
      const student = await Student.findOne({ email });

     
      if (student) {
        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (isMatch) {
          // Passwords match, student is authenticated
          const token =  jwt.sign({
            email: student.email,
            isAdmin: student.isAdmin,
          },'ayush69');
            return res.status(200).json({ message: 'Student',token:token,user : student });
          
        }
       
      }
      
  
      // Search for a teacher with the given email
      const teacher = await Teacher.findOne({ email });
      if (teacher) {
        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (isMatch) {
          // Passwords match, teacher is authenticated
            const token =  jwt.sign({
                email: teacher.email,
                isAdmin: teacher.isAdmin,
            },'ayush69')
          return res.status(200).json({ message: 'Teacher',token:token,user : teacher });
        }
      }
  
      // If no matching student or teacher found, authentication failed
      res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;