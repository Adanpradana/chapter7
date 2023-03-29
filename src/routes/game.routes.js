const express = require("express");
const router = express.Router();
const gameRoom = require("../controller/gameRoom");
const { authOnly, adminOnly } = require("../middleware/protected");
router.get("/", authOnly, adminOnly, gameRoom.getData);
router.post("/create", authOnly, gameRoom.create);
router.post("/login", gameRoom.login);
router.get("/:roomId", authOnly, adminOnly, gameRoom.getRoomById);
router.post("/:roomId/join", authOnly, gameRoom.joinPlayer);
router.post("/:roomId/play", authOnly, gameRoom.playerPlay);
router.post("/:roomId/winner", authOnly, gameRoom.gameResult);

router.delete("/remove", gameRoom.remove);
module.exports = router;
