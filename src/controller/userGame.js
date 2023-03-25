import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { name, username, password, age, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await prisma.userGame.create({
      data: {
        username,
        password: hashedPassword,
        biodata: {
          create: {
            name,
            age,
            gender,
          },
        },
      },
    });
  } catch (error) {}
}

module.exports = { register };
