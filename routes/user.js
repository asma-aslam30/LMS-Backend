const express = require('express')
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signupCustomer)
router.post('/login', userController.loginCustomer)

module.exports = router;