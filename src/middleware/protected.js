const jwt = require("jsonwebtoken");

const routes = (req, res, next) => {
  const token = req.session.token;
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
    if (err || !decodedToken) {
      return res.redirect("/login");
    }
    req.userId = decodedToken.id;
    next();
  });
};

const login = (req, res, next) => {
  const token = req.session.token;
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
    if (decodedToken) {
      req.userId = decodedToken.id;
      return res.redirect("/dashboard");
    }
    next();
  });
};
module.exports = { routes, login };
