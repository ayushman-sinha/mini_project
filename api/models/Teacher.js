const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    teacher_id :{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subject_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true,
    },
    password: {
        type: String,
        required: true,
    }

    

});
const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
