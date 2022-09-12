/**
 * Create a server using express that has the following routes:
 * Consider the resources / paths / methods...
 *
 * CREATE:  GET     /new        Form for new pet.
 * SAVE:    POST    /new        Create the new pet (handle submission.)
 * READ:    GET     /           Index of Pets (Displays All)
 * EDIT:    GET     /edit/:id   Render populated form.
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
const app = express()
const petRouter = require('./routes/pets')
app.set('view engine', 'ejs')

app.use('/pet', petRouter)

app.get('/', (req, res) =>{
    res.render('index', {text: 'Express'})
})

app.listen(PORT, () => console.log('Server is running on PORT 8000'))


const pets = [{ name: "Zoey", age: 1, type: "dog" }];
