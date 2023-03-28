const express = require("express");
const router = express.Router();
const gameRoom = require("../controller/gameRoom");

router.get("/", gameRoom.getData);
router.post("/create", gameRoom.create);
router.delete("/remove", gameRoom.remove);
module.exports = router;
