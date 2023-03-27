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
function whoAmI(req, res) {
  res.render("pages/whoami");
}
module.exports = { home, register, login, history, whoAmI, dashboard };
