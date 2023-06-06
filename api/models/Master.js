const mongoose = require('mongoose');

const MasterSchema = new mongoose.Schema({
    master_override :{
        type: Boolean,
        default: false
    },
    attendance_override :{
        type: Boolean,
        default: false
    }
});

const Master = mongoose.model('Master', MasterSchema);
module.exports = Master;