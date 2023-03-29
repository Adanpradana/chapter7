const express = require("express");
const router = express.Router();
const gameRoom = require("../controller/gameRoom");

router.get("/", gameRoom.getData);
router.post("/create", gameRoom.create);
router.get("/:roomId", gameRoom.getRoomById);
router.post("/:roomId/join", gameRoom.joinPlayer);
router.post("/:roomId/play", gameRoom.playerPlay);
router.post("/:roomId/result", gameRoom.gameResult);

router.delete("/remove", gameRoom.remove);
module.exports = router;
