const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require('bcrypt');
const cookieSession = require("cookie-session");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
const users = {
  test: {
    name: "Test",
    username: "test",
    password: "1234",
  },
};

app.use(
    cookieSession({
        name: 'session',
        keys:[
            'key1',
            'key2'
        ],
        maxAge: 24 * 60 * 60 * 1000
    })
)

const saltRounds = 12;

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const receivedUsername = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log('hashed password', hashedPassword);
  req.body.password = hashedPassword;
  users[receivedUsername] = {
    ...req.body,
  };

  console.log("users", users);
  res.cookie("username", receivedUsername);
  res.redirect("/profile");
});

app.get("/profile", (req, res) => {
  const username = req.cookies.username;
  if (!username) return res.redirect("/login");
  // if username = test2
  // users['test2']
  // users.test2 = {}
  const user = users[username];
  req.session.views=(req.session.views || 0) + 1;
  res.render("profile", { user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  console.log(receivedPassword, receivedUsername);
  console.log('user data', users)
  const user = users[receivedUsername];
  console.log('login', user);
  // {} or undefined
  if (!user) return res.send("invalid username");
  const isMatch = bcrypt.compare(receivedPassword, user.password);
  console.log('comparing')
  console.log(isMatch);
  if (isMatch) {
    res.cookie("username", user.username);
    return res.redirect("/profile");
  }
  res.send("invalid password");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(8080, () => console.log("server running 8080"));
