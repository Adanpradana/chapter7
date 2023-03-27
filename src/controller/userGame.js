const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, password } = req.body;
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
    res.status(500).send(error.message);
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.userGame.findUnique({
      where: {
        username,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.TOKEN, {
      expiresIn: "1d",
    });
    if (!user) return res.status(200).json({ message: "user not found !" });
    const compare = await bcrypt.compare(password, user.password);
    if (!compare)
      return res.status(200).json({ message: "password doesnt match" });

    req.session.token = token;
    res.status(200).redirect("/dashboard");
  } catch (error) {
    res.redirect("/login");
  }
}
function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = { register, login, logout };
