const router = require('express').Router();
const Coordinate = require('../models/Coordinate');

// Coordinate Addition/Updation
router.post('/add', async (req, res) => {
    try{
        
        const four_corners = req.body.coordinate;
        console.log(four_corners);
        if(!four_corners){
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const coordinate = new Coordinate({ four_corners });
       //Overwrite if already present
        
        await coordinate.save();
        

        res.status(201).json({ message: "Coordinate Added Successfully" });

    }
    catch(err){
        res.status(500).json({ error: "Failed to add coordinate" });
    }
});


module.exports = router;
