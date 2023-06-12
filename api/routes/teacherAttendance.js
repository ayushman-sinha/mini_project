const router = require('express').Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Teacher = require('../models/Teacher');

//View Attendance for student
router.get('/viewAttendance', async (req, res) => {
    try{
        const response = await Attendance.find();
        let {teacher_id,subject_id} = req.body;
        let result=[];
        for(let i=0;i<response.length;i++){
            for(let j=0;j<response[i].subject_list.length;j++){
                if(response[i].subject_list[j].subject_id===subject_id){
                    result.push({attendance_date: response[i].attendance_date, student_list: response[i].subject_list[j].student_list});
                }
            }
        }
        console.log(result);
        return res.status(200).json({ result });

    }catch(err){
        res.status(500).json({ error: "Failed to view attendance" });
    }
});



module.exports = router;