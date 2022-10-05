const express = require('express');
const studentControllers = require('../controllers/students-Controllers');

const router = express.Router();

router.get('/', studentControllers.getStudents);

module.exports = router;