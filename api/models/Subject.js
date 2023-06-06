const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subject_id :{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
})
const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;