const express = require("express");
const router = express.Router();
const userGame = require("../controller/userGame");

router.post("/register", userGame.register);
router.post("/login", userGame.login);
router.get("/logout", userGame.logout);
module.exports = router;
