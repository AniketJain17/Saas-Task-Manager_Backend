const express = require('express');
const router  = express.Router();

const signup = require("../controllers/auth/signup.controller");
const login = require("../controllers/auth/login.controller");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;