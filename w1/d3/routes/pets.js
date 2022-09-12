const express = require('express');
const router = express.Router();

//new
router.get('/new', (req, res) =>{
    res.render('new', {title: '<h2>Add a new pet info</h2>'})
})

module.exports = router;