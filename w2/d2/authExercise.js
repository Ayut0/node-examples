// - Step 1: Create the server with express Done

// - Step 2: Make the server to listen requests Done

// - Step 3: Create an object of users Done

// - Step 4: Create a route `/register` that expects a GET request and respond with a form using EJS file Done

// - Step 5: In the form, include method POST and action to `/register` endpoint Done

// - Step 6: Create a route `/register` that expects a POST request and respond with cookies Done

// - Step 7: Check in Chrome Dev Tools > Application > Cookies. Done

// - Step 8: Create a route `/login` that expects a GET request and respond with a form using EJS file Done

// - Step 9: In the form, include method POST and action to `/login` endpoint Done

// - Step 10: Create a route `/login` that expects a POST request and respond with cookies if email and password are matching with stored data. Done

// - Step 11: Create a button to user logout. It should be in a form with method POST and action to `/logout` endpoint

// - Step 12: Create a route `/logout` that expects a POST request and redirect the client to `/` DOne

const express = require('express')
const app = express()
const PORT = 5000;
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(cookieParser());
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

let users = [
    {
        email: 'test@testyade.com',
        password: 'testyanen'
    }
]

app.get('/register', (req, res) =>{
    res.render('register')
})

app.post('/register', (req, res) =>{
    console.log(req.body);
    const body = req.body
    const validation = users.some((user) => req.body.email === user.email);
    console.log(validation);
    if(validation) {
        console.log('This email already exists')
        return;
    }
    res.cookie("email", req.body.email)
    users = [...users, { ...req.body }]
    console.log('current list', users);

    res.redirect('/profile')
})


app.get('/login', (req, res) =>{
    res.render('login')
})

app.post('/login', (req, res) =>{
    console.log(req.body);
    console.log(req.cookies);
    console.log(users)
    if(req.body.email === req.cookies.email){
        console.log('Match')
        const targetUser = users.find((user) => user.email === req.body.email)
        console.log('target user', targetUser);
        if(req.body.password === targetUser.password){
            res.send("You are logged in");
        }else{
            console.log('Does not match');
            return;
        }
}})

app.get('/', (req, res) =>{
    res.render('/')
})

app.get("/logout", (req, res) => {
    res.clearCookie("email");
    res.redirect("/");
  });