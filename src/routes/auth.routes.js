const express = require("express");
const router = express.Router();
const userGame = require("../controller/userGame");
const gameRoom = require("../controller/gameRoom");
const { restrictLogin, restrictRoutes } = require("../middleware/protected");

router.get("/logout", userGame.logout);
router.get("/users", userGame.getUsers);
router.post("/register", userGame.register);
router.post("/login", userGame.login);
router.post("/users/edit/", userGame.editUsers);
router.post("/users/remove/", userGame.removeUser);
//get all data users
router.post("/room/create", gameRoom.create);

module.exports = router;
