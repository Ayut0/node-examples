const bcrypt = require("bcrypt");
const { hashPassword } = require("../helpers/userHelper");
const users = require("../models/users.json");

const showRegisterForm = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  console.log("body", req.body);
  const receivedUsername = req.body.username;
  const hashedPassword = hashPassword(req.body.password);
  users[receivedUsername] = {
    ...req.body,
    password: hashedPassword,
  };
  console.log("users", users);
  // res.cookie("username", receivedUsername);
  req.session.username = receivedUsername;
  res.redirect("/profile");
};

const showLoginForm = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
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
    req.user.username = user.username;
    return res.redirect("/profile");
  }
  res.send("invalid password");
};

const logoutUser = (req, res) => {
  // res.clearCookie("username");
  req.session = null;
  res.redirect("/login");
};

module.exports = {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
};
