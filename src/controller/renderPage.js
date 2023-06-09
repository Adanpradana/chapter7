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
async function dashboard(req, res) {
  const id = req.userId; //from token
  const whoMe = await prisma.userGame.findUnique({
    where: {
      id,
    },
  });

  const users = await prisma.userGame.findMany({
    include: {
      biodata: true,
    },
  });

  res.render("pages/dashboard", {
    person: whoMe.username,
    users,
  });
}
const renderEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.userGame.findUnique({
      where: {
        id,
      },
      include: {
        biodata: true,
      },
    });

    res.render("pages/editUser", { person: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
async function whoAmI(req, res) {
  const id = req.userId;
  try {
    const whoMe = await prisma.userGame.findUnique({
      where: {
        id,
      },
    });

    return res.render("pages/whoami", { person: whoMe.username });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  home,
  register,
  login,
  history,
  whoAmI,
  dashboard,
  renderEdit,
};
