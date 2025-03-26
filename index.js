const express = require('express');
const cors = require('cors');

const connectDB = require('./connectDb');
const userRoutes = require('./routes/user');

const app = express();

connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // This allows requests from any origin

// Example Route
app.get('/', (req, res) => {
    console.log('got request from main route')
    res.send('MongoDB connected with Express.js');
});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
