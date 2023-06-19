const router = require('express').Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Teacher = require('../models/Teacher');

//View Attendance for teacher
router.post('/viewAttendanceTeacher', async (req, res) => {
    try{        
        let {teacher_id,subject_id,attendance_date} = req.body;
        const date1 = new Date(attendance_date).toLocaleDateString();

        
        const response = await Attendance.find({ attendance_date:date1 });
        console.log(response);
        let result=[];
       
            for(let i=0;i<response[0].subject_list.length;i++){
                if(response[0].subject_list[i].subject_id===subject_id){
                    result.push({  attendance_date : date1, student_id : response[0].subject_list[i].student_list});
                }
            }
        
        console.log(result);
        return res.status(200).json({ result });

    }catch(err){
        res.status(500).json({ error: "Failed to view attendance" });
    }
});



module.exports = router;