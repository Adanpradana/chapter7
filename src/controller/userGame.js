import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await prisma.userGame.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    if (!createUser) {
      return res.send("cannot be empty");
    }
    res
      .status(200)
      .json({ message: "success create user", payload: createUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { register };
