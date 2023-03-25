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
function whoAmI(req, res) {
  res.render("pages/whoami");
}
module.exports = { home, register, login, history, whoAmI };
