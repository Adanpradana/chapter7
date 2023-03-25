const express = require("express");
const router = express.Router();
const renderPage = require("../controller/renderPage");

router.get("/", renderPage.home);
router.get("/register", renderPage.register);
router.get("/login", renderPage.login);
router.get("/history", renderPage.history);
router.get("/whoami", renderPage.whoAmI);

module.exports = router;
