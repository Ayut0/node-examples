const express = require("express");
const router = express.Router();
const { showProfiles } = require('../controllers/ShowProfiles')

// router.get('/', showProfiles);

router.get('/', (req, res) =>{
    res.render('profile', showProfiles)
})

module.exports = router;