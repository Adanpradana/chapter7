const session = require("express-session");
const express = require("express");
const flash = require("req-flash");
const path = require("path");
const app = express();
const port = 8000;
const renderRoutes = require("./src/routes/render.routes");
const authRoutes = require("./src/routes/auth.routes");
const gameRoutes = require("./src/routes/game.routes");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: 3600000000,
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.json());

app.use("/", renderRoutes);
app.use("/auth", authRoutes);
app.use("/auth/room", gameRoutes);
// app.use(createLog);

app.listen(port, () => console.log(`running in port ${port}`));
