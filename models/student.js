const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
    },
    address: {
        type: String,
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;