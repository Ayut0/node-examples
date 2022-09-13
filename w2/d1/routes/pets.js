const express = require('express');
const router = express.Router();

//new
router.get('/new', (req, res) =>{
    res.render('../views/form.ejs', {title: 'Add a new pet info'})
})

router.get('/edit/:id', (req, res)=>{
    console.log(req.params)
    res.render('../views/form.ejs', {title: `Edit ${req.params.id}`})
})



module.exports = router;