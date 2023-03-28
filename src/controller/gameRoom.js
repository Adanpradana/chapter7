const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const jwt = require("jsonwebtoken");

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
    const gameRoom = await prisma.gameRoom.create({
      data: {
        player_one: user.username,
      },
    });

    res.status(200).json({ message: "game room created !", id: gameRoom.id });
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
module.exports = { create, getData, remove };
