const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Student = require('../models/student'); // Assuming you're fetching the student data here
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const getStudentById = async (req, res) => {
    const { userId } = req.query; 
    const token = req.headers['token']; 

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        // Verify the JWT token and decode it
        const decoded = jwt.verify(token, jwtSecret);

        // Find user by the userId in request params
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the email in the token matches the email of the userId
        if (decoded.email !== user.email) {
            return res.status(403).json({ message: 'Unauthorized: Email does not match' });
        }

        // If the email matches, fetch the student data (assuming the student schema is tied to userId)
        const student = await Student.findOne({ userId: user.userId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Return student data
        return res.status(200).json({ student });

    } catch (error) {
        console.error('Error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateStudentById = async (req, res) => {
    const { userId } = req.body; // Get userId from URL params
    const token = req.headers['token']; // Get token from authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }
  
    try {
      // Verify the token and decode it
      const decoded = jwt.verify(token, jwtSecret);
  
      // Find the user by userId
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the email from the decoded token matches the email of the user
      if (decoded.email !== user.email) {
        return res.status(403).json({ message: 'Unauthorized: Email does not match' });
      }
  
      // Find the student by userId
      const student = await Student.findOne({ userId });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Update student data with the fields from the request body
      const updatedStudent = await Student.findOneAndUpdate(
        { userId }, // Find the student by userId
        { $set: req.body }, // Update the student with the data in the request body
        { new: true } // Return the updated student document
      );
  
      // Return the updated student data
      return res.status(200).json({ student: updatedStudent });
  
    } catch (error) {
      console.error('Error:', error);
  
      // If the token is invalid
      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Handle other errors
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

module.exports = { getStudentById, updateStudentById };
