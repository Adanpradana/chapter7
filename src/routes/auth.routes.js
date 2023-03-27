const express = require("express");
const router = express.Router();
const userGame = require("../controller/userGame");

router.post("/register", userGame.register);
module.exports = router;
