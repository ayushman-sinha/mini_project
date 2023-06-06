const router = require('express').Router();
const e = require('express');
const Master = require('../models/Master');

//Attendance Override
router.post('/attendance', async (req, res) => {
    try{
       // console.log(req.body)
        const attendance_override = req.body;
        
       
        
       //Overwrite if already present
       const existingMaster = await Master.findOne({});
       
            if(existingMaster){
                const updatedMaster = await Master.deleteOne({});
                const master = new Master({
                    master_override: existingMaster.master_override,
                    attendance_override: req.body.attendance_override,
                    teacher : req.body.teacher
                })
                await master.save();                 
            return res.status(201).json({ message: "Attendance Override Updated Successfully" });
         }
         else{
             const master = new Master({
                master_override: false ,
                attendance_override: req.body.attendance_override,
                teacher : req.body.teacher                
             });
            
                await master.save();
         }
        return res.status(201).json({ message: "Attendance Override Added Successfully" });
    }
    catch(err){
        res.status(500).json({ error: "Failed to add attendance override" });
    }
});

//Get Attendance/ Master Override
router.get('/getOverride', async (req, res) => {
    try{
        const master = await Master.findOne({});
        if(!master){
            return res.status(422).json({ error: "No master found" });
        }
        return res.status(201).json({ master });
    }
    catch(err){
        res.status(500).json({ error: "Failed to get master" });
    }
});


//Master Override
router.post('/master', async (req, res) => {
    try{
       // console.log(req.body)
        const master_override = req.body;
        
       
        
       //Overwrite if already present
       const existingMaster = await Master.findOne({});
       
            if(existingMaster){
                const updatedMaster = await Master.deleteOne({});
                const master = new Master({
                    master_override: req.body.master_override,
                    attendance_override: existingMaster.attendance_override,
                    teacher : existingMaster.teacher
                })
                await master.save();                 
            return res.status(201).json({ message: "Master Override Updated Successfully" });
         }
         else{
             const master = new Master({
                master_override: req.body.master_override,
                attendance_override: false,
                teacher : ""                
             });
            
                await master.save();
         }
        return res.status(201).json({ message: "Master Override Added Successfully" });
    }
    catch(err){
        res.status(500).json({ error: "Failed to add master override" });
    }
});

module.exports = router;