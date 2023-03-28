const express = require("express");
const router = express.Router();
const renderPage = require("../controller/renderPage");
const { restrictLogin, restrictRoutes } = require("../middleware/protected");

router.get("/", restrictLogin, renderPage.home);
router.get("/register", restrictLogin, renderPage.register);
router.get("/dashboard", restrictRoutes, renderPage.dashboard);
router.get("/login", restrictLogin, renderPage.login);
router.get("/history", renderPage.history);
router.get("/whoami", restrictRoutes, renderPage.whoAmI);

module.exports = router;
