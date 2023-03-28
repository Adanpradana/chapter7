const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create(req, res) {
  const { username } = req.body;
  try {
    if (username == null || username === "") {
      return res.status(400).json({ message: "username cannot be empty !" });
    }
    const user = await prisma.userGame.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res
        .status(403)
        .json({ message: `no user ${username} in our database` });
    }
    const gameRoom = await prisma.gameRoom.create({
      data: {
        player_one: user.username,
      },
    });

    res.status(200).json({
      message: `game room created ! ${gameRoom.player_one} joined the game`,
      gameRoomId: gameRoom.id,
    });
  } catch (error) {
    res.send(error.message);
  }
}
async function getData(req, res) {
  try {
    const getRoomData = await prisma.gameRoom.findMany();
    if (getRoomData.length > 0) {
      return res
        .status(200)
        .json({ message: "success get all room data", data: getRoomData });
    }
    res.status(200).json({ message: "room is empty !" });
  } catch (error) {
    Promise.reject(error.message);
  }
}

async function getRoomById(req, res) {
  const { roomId } = req.params;

  try {
    const getRoom = await prisma.gameRoom.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!getRoom) {
      return res.status(400).json({ message: "room not found" });
    }
    res.status(200).json({ message: "success get room id", room: getRoom });
  } catch (error) {
    res.send(error.message);
  }
}
async function joinPlayer(req, res) {
  const { roomId } = req.params;
  const { username } = req.body;
  try {
    if (username == null || username === "") {
      return res.status(400).json({ message: "player_two cannot be empty !" });
    }
    if (roomId == null || roomId === "") {
      return res.status(400).json({ message: "no room valid!" });
    }
    const getPlayer = await prisma.userGame.findUnique({
      where: {
        username,
      },
    });
    if (!getPlayer) {
      return res.status(401).json({ message: "no player or username found" });
    }
    const getRoom = await prisma.gameRoom.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!getRoom) {
      return res.status(401).json({ message: "room not found" });
    }
    if (
      getRoom.player_one === getPlayer.username ||
      getRoom.player_two === getPlayer.username
    ) {
      return res.status(400).json({ message: "player joined !" });
    }
    if (getRoom.player_two) {
      return res.status(400).json({
        message: `room is full ${getRoom.player_two} already in the room`,
      });
    }
    const updateRoom = await prisma.gameRoom.update({
      where: {
        id: getRoom.id,
      },
      data: {
        player_two: getPlayer.username,
      },
    });

    res.status(200).json({
      message: `${updateRoom.player_two} joined to the room`,
      data: updateRoom,
    });
  } catch (error) {
    res.send(error.message);
  }
}

async function remove(req, res) {
  const { id } = req.body;
  try {
    const getRoomData = await prisma.gameRoom.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "success delete room!" });
  } catch (error) {
    Promise.reject(error.message);
  }
}
module.exports = { create, getData, remove, getRoomById, joinPlayer };
