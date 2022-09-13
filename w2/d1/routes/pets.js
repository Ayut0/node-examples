const express = require('express');
const pets = require('../exercise');
const router = express.Router();

//new
router.get('/new', (req, res) =>{
    res.render('../views/form.ejs', {title: 'Add a new pet info'})
})

router.get('/edit/:id', (req, res)=>{
    console.log(req.params)
    console.log(pets.pets[0], (pets.pets[0].age).toString())
    res.render('../views/editForm.ejs', {title: `Edit ${pets.pets[0].name}`, name: pets.pets[0].name, age: (pets.pets[0].age).toString(), type: pets.pets[0].type})
})

module.exports = router;