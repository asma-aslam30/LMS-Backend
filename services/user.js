const User = require('../models/user');
const Student = require('../models/student');

    const createStudent = async(userData) => {
        const {
            userId,
            studentId,
            name,
            fatherName,
            contact,
            address
        } = userData;
        const student = new Student({
            userId,
            studentId,
            name,
            fatherName,
            contact,
            address
        });
        const res = await student.save();
        console.log('Student created:', res);
        return res;
    }
const addUser = async(userData) => {
    const {
        userId,
        email,
        password,
        role
    } = userData;
    const user = new User({
        userId,
        email,
        password,
        role
    });
    const res = await user.save();
    console.log('User created:', res);
    return res;
}

module.exports = {
    createStudent,
    addUser
}