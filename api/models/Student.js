const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id :{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    subject_list: {
        type: Array,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        
    },    
    password: {
        type: String,
        required: true,
    }
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;

/*
    {
            "student_id": "1SI20IS008",
            "name": "Ayushman Sinha",
            "email": "ayushman.sinha411@gmail.com",
            "subject_list" : ["CN","DBMS","AI/ML"],
            "isAdmin" : false            
    }

*/