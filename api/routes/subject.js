const router = require('express').Router();
const Subject = require('../models/Subject');

// Subject Registration
router.post('/register', async (req, res) => {
    try{
        const { subject_id, name } = req.body;
        console.log(req.body);
        if(!subject_id || !name){
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const subject = new Subject({ subject_id, name });
        await subject.save();
        res.status(201).json({ message: "Subject Registered Successfully" });

    }
    catch(err){
        res.status(500).json({ error: "Failed to register" });
    }
});

// Get all subjects
router.get('/get_subjects', async (req, res) => {
    try{
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    }
    catch(err){
        res.status(500).json({ error: "Failed to get subjects" });
    }
});

module.exports = router;