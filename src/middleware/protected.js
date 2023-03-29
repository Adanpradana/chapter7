const jwt = require("jsonwebtoken");

const restrictRoutes = (req, res, next) => {
  const token = req.session.token;
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
    if (err || !decodedToken) {
      return res.redirect("/login");
    }
    req.userId = decodedToken.id;
    next();
  });
};

const restrictLogin = (req, res, next) => {
  const token = req.session.token;
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
    if (decodedToken) {
      req.userId = decodedToken.id;
      return res.redirect("/dashboard");
    }
    next();
  });
};

const authOnly = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = { restrictRoutes, restrictLogin, authOnly };
