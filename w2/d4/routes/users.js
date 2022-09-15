// in /routes/users
const express = require("express");
const router = express.Router();
const { showUsers } = require("../controllers/UserController");

// endpoint http://localhost:3000/users/
router.get("/", showUsers);

// endpoint http://localhost:3000/users/:id
router.get("/:id", (req, res) => {
  res.send("User id route");
});

module.exports = router;
