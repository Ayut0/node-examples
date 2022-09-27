const express = require("express");
const {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();

router.get("/register", showRegisterForm);

router.post("/register", registerUser);

router.get("/login", showLoginForm);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
