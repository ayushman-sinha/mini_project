const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    attendance_date :{
        type: String,
        required: true,
        unique: true,       
    },
    subject_list: {
        type: Array,
        required: true,        
    }
})

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;