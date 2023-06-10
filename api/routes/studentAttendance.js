const router = require('express').Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

//Take Attendance for student
router.post('/takeAttendance', async (req, res) => {
    
    let date1 = new Date().toLocaleDateString();
    const { student_id, subject_id } = req.body;
    console.log(date1);
    
    try{
        const response= await  Attendance.findOne({ attendance_date: date1 });
        
        if(response){
            //Check if student already taken attendance            
            for( let i=0;i<response.subject_list.length;i++){
                if(response.subject_list[i].subject_id===subject_id){
                    for(let j=0;j<response.subject_list[i].student_list.length;j++){
                        if(response.subject_list[i].student_list[j]===student_id){
                            return res.status(200).json({ message: "Attendance Already Taken" });
                        }
                    }
                }
            }
            
            let x=response.subject_list;
            //console.log(x);
            let flag=0;
            for(let i=0;i<x.length;i++){
                if(x[i].subject_id===subject_id){
                    x[i].student_list.push(student_id);
                    flag=1;
                    break;
                }
            }
            if(flag===0){
                x.push({subject_id: subject_id, student_list: [student_id]});
            }
            //console.log(x);
            await Attendance.findOneAndUpdate({ attendance_date: date1 }, { subject_list: x });
            return res.status(200).json({ message: "Attendance Taken" });
        }
        else{           
            //Create 2D array with subject list and for each subject list of student_id
           
            let x=[{subject_id: subject_id, student_list: [student_id]}];
           
            console.log(x);

            const attendance = new Attendance({ attendance_date: date1, subject_list: x});
            await attendance.save();
            return res.status(200).json({ message: "Attendance Taken" });
        }
    }
    catch(err){
        res.status(500).json({ error: "Failed to take attendance" });
    }
});  

//View Attendance
router.get('/viewAttendance', async (req, res) => {
     try{
        const { student_id } = req.body;
        const response1 = await Attendance.find();
        const result=[]
        for(let i=0;i<response1.length;i++){
            for(let j=0;j<response1[i].subject_list.length;j++){
                for(let k=0;k<response1[i].subject_list[j].student_list.length;k++){
                    if(response1[i].subject_list[j].student_list[k]===student_id){
                        result.push({attendance_date: response1[i].attendance_date, subject_id: response1[i].subject_list[j].subject_id});
                    }
                }
            }
        }
        console.log(result);
        return res.status(200).json({ result });
     }
     catch(err){
        res.status(500).json({ error: "Failed to view attendance" });
     }
});

module.exports = router;
