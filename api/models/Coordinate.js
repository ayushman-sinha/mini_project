const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
    four_corners :{
        type: Array,        
    }   
})

const Coordinate = mongoose.model('Coordinate', CoordinateSchema);
module.exports = Coordinate;