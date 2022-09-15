// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.set("view engine", "ejs");
const users = {
  test: {
    name: "Test",
    username: "test",
    password: "1234",
  },
};

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const receivedUsername = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  users[receivedUsername] = {
    ...req.body,
    password: hashedPassword,
  };
  console.log("users", users);
  // res.cookie("username", receivedUsername);
  req.session.username = receivedUsername;
  res.redirect("/profile");
});

app.get("/profile", (req, res) => {
  // const username = req.cookies.username;
  const username = req.session.username;

  if (!username) return res.redirect("/login");
  // if username = test2
  // users['test2']
  // users.test2 = {}
  const user = users[username];
  res.render("profile", { user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];

  // {} or undefined
  let isMatch;
  if (user) {
    isMatch = await bcrypt.compare(receivedPassword, user.password);
  }
  if (!user || !isMatch) return res.send("invalid username or password");
  if (isMatch) {
    // res.cookie("username", user.username);
    req.session.username = user.username;
    return res.redirect("/profile");
  }
  res.send("invalid password");
});

app.post("/logout", (req, res) => {
  // res.clearCookie("username");
  req.session = null;
  res.redirect("/login");
});

app.listen(8080, () => console.log("server running 8080"));
