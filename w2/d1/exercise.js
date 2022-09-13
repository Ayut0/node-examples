/**
 * Create a server using express that has the following routes:
 * Consider the resources / paths / methods...
 *
 * CREATE:  GET     /new        Form for new pet. Done
 * SAVE:    POST    /new        Create the new pet (handle submission.) Done
 * READ:    GET     /           Index of Pets (Displays All) Done
 * EDIT:    GET     /edit/:id   Render populated form. another form. Create a another ejs and action
 * UPDATE:  POST    /edit/:id   Update pet resource (handle submission.)
 * DELETE:  POST    /delete/:id Remove pet resource.
 *
 * The forms should be rendered using ejs.
 *
 * STRETCH (BONUS): The server should have a JSON file that stores the pets.
 *
 */


const express = require('express');
const PORT = 8000;
const app = express();
const petRouter = require('./routes/pets');
const serveStatic = require("serve-static");
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/pet', petRouter);

let pets = [{ id: 1, name: "Zoey", age: 1, type: "dog" }];

//READ
app.get('/', (req, res) =>{
    res.render('index', {text: 'Pets list', pets});
})

//ADD
app.post('/pets', (req, res) =>{
    console.log('new pet register request')
    console.log('body', req.body);
    const newPet = {
        id: pets.length + 1,
        name: req.body.name,
        age: req.body.age,
        type: req.body.type
    }
    pets = [...pets, newPet];
    console.log(pets);
    res.render('index', {text: 'Pets list', pets});
    res.redirect('/');
})

//EDIT
app.post('/pets', (req, res) =>{
    console.log('Edit pet register request')
    console.log('body', req.body);
    const updatedPet = { ...req.body }
    console.log(updatedPet)
    pets = pets.map((pet) =>{
        if(pet.id === updatedPet.id){
            console.log(pet.id, updatedPet.id)
            return updatedPet
        }
        return pet;
    })
    res.render('index', {text: 'Pets list', pets});
    res.redirect('/');
})

//DELETE

app.listen(PORT, () => console.log('Server is running on PORT 8000'))


