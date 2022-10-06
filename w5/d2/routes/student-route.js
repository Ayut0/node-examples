const express = require('express');
const studentControllers = require('../controllers/students-Controllers');

const router = express.Router();

router.get('/nogithub', studentControllers.getStudentsWithoutGithub);
router.get('/viaclass', studentControllers.getStudentsViaClass);
router.get('/totalstudentsviaclass', studentControllers.getTotalNumberOfStudents);
router.get('/getstudentwioutemailorphone', studentControllers.getStudentsWithoutEmailOrPhone);
router.get('/getstudentwioutgmailorphone', studentControllers.getStudentsWithoutGmailOrPhone);

module.exports = router;