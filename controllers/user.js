const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, createStudent } = require("../services/user");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const userData = {
        name,
        fatherName,
        contact,
        address,
        email,
        password,
        role
    } = req.body;

    try {
        const saltRounds = 15;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        userData.studentId = 's3';
        userData.userId = 'u3';
        const user = await addUser(userData);
        const student = await createStudent(userData);
        console.log(user, student);

        res.status(200).json({ message: 'User created' });
    } catch (error) {
        console.error('Error:',error);
        res.status(500).json({ message: 'Some error occurred', error: error.message });
    }
};

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     let token = null;

//     try {
//         const customer = await Customer.findOne({ email });
//         if (!customer) {
//             return res.status(404).json({ message: 'Customer not found.' });
//         }

//         // Compare the hashed password with the provided password
//         const isMatch = await bcrypt.compare(password, customer.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials.' });
//         }

//         token = await jwt.sign({ email: customer.email, role: 'customer' }, jwtSecret, {
//             expiresIn: 86400 // expires in 24 hours
//         });

//         console.log(token)
//         res.status(200).json({ token: token, email: customer.email, customerId: customer.customerId, msg: 'successfully logged in.' });

//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// };

module.exports = {
    signup,
    // login
}