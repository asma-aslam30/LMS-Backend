const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    instructorId: {
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
    contact: {
        type: Number,
    },
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;