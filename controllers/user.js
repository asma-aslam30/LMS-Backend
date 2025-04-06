const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, createStudent } = require("../services/user");
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); // <-- for unique IDs
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const {
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
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userId = 'u-' + uuidv4();
        const studentId = 's-' + uuidv4();

        const userData = {
            name,
            fatherName,
            contact,
            address,
            email,
            password: hashedPassword,
            role,
            userId,
            studentId
        };

        const user = await addUser(userData);
        const student = await createStudent(userData);
        console.log(user, student);

        res.status(200).json({ message: 'User created', userId, studentId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Some error occurred', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    let token = null;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        token = await jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        console.log(token)
        res.status(200).json({ token: token, email: user.email, userId: user.userId, msg: 'successfully logged in.' });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = {signup, login}