const express = require('express')
const fs = require("fs");
const app = express()
const PORT = 5000;
const bodyParser = require("body-parser");

app.use(express.json('./users.json'));
app.use(bodyParser.json())
// app.use(express.static('./users.json'));

//READ
const read = () =>{
    const data = fs.readFileSync('users.json', 'utf-8');
    console.log(data);
    return JSON.parse(data).users;
}

//SAVE
const save = (updatedUsers) =>{
    fs.writeFileSync('users.json', JSON.stringify({users:updatedUsers}))
    return {message: 'file updated'}
}

//GET
app.get('/users', (req, res) =>{
    console.log(req.method);
    const users = read();
    console.log(users);
    res.json(users);
});

//CREATE
app.post('/users', (req, res) =>{
    console.log(req.body);
    let body = req.body;
    const users = read()
    const newUser = {id: users.length + 1, ...body};
    const updatedUsers = [...users, newUser];
    console.log(updatedUsers);
    save(updatedUsers);
    res.json(newUser)

});

//UPDATE
app.put('/users', (req, res) =>{
    const users = read();
    const updatedUser = { ...req.body };
    const updatedUsers = users.map((user) => {
        if(user.id === updatedUser.id){
            return { ...updatedUser }
        }
        return user;
    });
    save(updatedUsers);
    res.json({message: 'User is updated'})
})

//DELETE
app.delete('/users', (req, res) => {
    const users = read();
    const updatedUsers = users.filter((user) =>{
        return 
    })
})


app.listen(PORT, () => console.log('server running on port 5000'))