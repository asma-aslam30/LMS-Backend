const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const jwtSecret = process.env.JWT_SECRET;

