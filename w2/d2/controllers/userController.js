const users = require("../models/users.json");

const showUserProfile = (req, res) => {
  // const username = req.cookies.username;
  const username = req.session.username;

  if (!username) return res.redirect("/login");
  // if username = test2
  // users['test2']
  // users.test2 = {}
  const user = users[username];
  res.render("profile", { user });
};

module.exports = { showUserProfile };
