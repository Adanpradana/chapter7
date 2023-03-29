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
  if (username == null || username === "") {
    return res.status(400).json({ message: "player_two cannot be empty !" });
  }
  if (roomId == null || roomId === "") {
    return res.status(400).json({ message: "no room valid!" });
  }
  try {
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
async function playerPlay(req, res) {
  const { roomId } = req.params;
  const { choice, username } = req.body;
  if (username == null || username === "") {
    return res.status(400).json({ message: "player` cannot be empty !" });
  }
  if (roomId == null || roomId === "") {
    return res.status(400).json({ message: "no room valid!" });
  }
  if (
    choice == null ||
    choice === "" ||
    !["R", "P", "S"].includes(choice.toUpperCase())
  ) {
    return res.status(400).json({ message: "please enter valid choice" });
  }
  try {
    const getRoomId = await prisma.gameRoom.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!getRoomId) {
      return res.status(400).json({ message: "room not found" });
    }

    let condition = null;
    if (getRoomId.player_one === username) {
      condition = "player_one";
    } else if (getRoomId.player_two === username) {
      condition = "player_two";
    } else {
      return res.status(400).json({ message: "user not registered as player" });
    }

    const { player_one_choice, player_two_choice } = getRoomId;
    if (player_one_choice.length === 3 && player_two_choice.length === 3) {
      return res
        .status(400)
        .json({ message: "game finsihed check the result" });
    }
    if (condition === "player_one") {
      if (player_one_choice.length > player_two_choice.length) {
        return res.status(200).json({ message: "wait your turn player one!" });
      } else {
        if (player_one_choice.length === 3) {
          return res.status(400).json({ message: "player 1 chance is full" });
        }
        const updateRoomId = await prisma.gameRoom.update({
          where: {
            id: roomId,
          },
          data: {
            player_one_choice: player_one_choice.concat(choice),
          },
        });
        return res.status(200).json({
          message: `player one picked !`,
        });
      }
    }
    if (
      player_one_choice.length === 0 ||
      player_two_choice.length === player_one_choice.length
    ) {
      return res.status(200).json({ message: "wait your turn player two!" });
    } else {
      if (player_two_choice.length === 3) {
        return res.status(400).json({ message: "player 2 chance is full" });
      }
      const updateRoomId = await prisma.gameRoom.update({
        where: {
          id: roomId,
        },
        data: {
          player_two_choice: player_two_choice.concat(choice),
        },
      });
      return res.status(200).json({ message: `player two picked !` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function gameResult(req, res) {
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

    let playerOneScore = 0;
    let playerTwoScore = 0;

    getRoom.player_one_choice.forEach((pick, index) => {
      const playerOne = pick[index];
      const playerTwo = getRoom.player_two_choice[index];
      if (playerOne === playerTwo) {
        playerOneScore === 0 || playerTwoScore === 0;
        getRoom.Result.push("Draw");
      } else if (
        (playerOne === "P" && playerTwo === "R") ||
        (playerOne === "S" && playerTwo === "P") ||
        (playerOne === "R" && playerTwo === "S")
      ) {
        getRoom.Result.push(`player one wins`);
        playerOneScore++;
      } else {
        getRoom.Result.push(`player two wins`);
        playerTwoScore++;
      }
    });
    if (playerOneScore === playerTwoScore) {
      getRoom.winner = "draw";
    } else if (playerOneScore > playerTwoScore) {
      getRoom.winner = `player one: ${getRoom.player_one} is champion`;
    } else {
      getRoom.winner = `player two: ${getRoom.player_two} is champion`;
    }
    const winner = await prisma.gameRoom.update({
      where: {
        id: roomId,
      },
      data: {
        winner: getRoom.winner,
      },
    });

    res.status(200).json({ message: "succes update data! yeay", data: winner });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  create,
  getData,
  remove,
  getRoomById,
  joinPlayer,
  playerPlay,
  gameResult,
};
