const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function home(req, res) {
  res.render("pages/index", { title: "What's so special" });
}

function register(req, res) {
  res.render("pages/register");
}
function login(req, res) {
  res.render("pages/login");
}
function history(req, res) {
  res.render("pages/history");
}
function dashboard(req, res) {
  res.render("pages/dashboard");
}
async function whoAmI(req, res) {
  const id = req.userId;
  try {
    const whoMe = await prisma.userGame.findUnique({
      where: {
        id,
      },
    });

    return res.render("pages/whoami", { payload: whoMe.username });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = { home, register, login, history, whoAmI, dashboard };
