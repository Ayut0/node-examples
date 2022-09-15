const users = require("../models/users.json");

const showUsers = (req, res) => {
  res.render("users", { users: Object.values(users) });
};

module.exports = { showUsers };
