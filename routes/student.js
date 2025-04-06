const express = require('express')
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/getStudentById', studentController.getStudentById);
router.put('/updateStudentById', studentController.updateStudentById);

module.exports = router;