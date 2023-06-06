const router = require('express').Router();
const Coordinate = require('../models/Coordinate');

// Coordinate Addition/Updation
router.post('/add', async (req, res) => {
    try{
        
        const four_corners = req.body;
        console.log(four_corners);
        if(!four_corners){
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        
       //Overwrite if already present
       const existingCoordinate = await Coordinate.findOne({ four_corners });
            if(existingCoordinate){
                const updatedCoordinate = await Coordinate.updateOne({ four_corners });
            return res.status(201).json({ message: "Coordinate Updated Successfully" });
         }
         else{
             const coordinate = new Coordinate({
                four_corners
             });
                const savedCoordinate = await coordinate.save();

         }
        
        
        return res.status(201).json({ message: "Coordinate Added Successfully" });

       
        
    }
    catch(err){
        res.status(500).json({ error: "Failed to add coordinate" });
    }
});


module.exports = router;
