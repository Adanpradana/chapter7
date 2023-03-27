const express = require("express");
const router = express.Router();
const renderPage = require("../controller/renderPage");
const protected = require("../middleware/protected");

router.get("/", protected.routes, renderPage.home);
router.get("/register", renderPage.register);
router.get("/login", protected.login, renderPage.login);
router.get("/history", renderPage.history);
router.get("/whoami", renderPage.whoAmI);

module.exports = router;
