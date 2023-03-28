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
module.exports = { restrictRoutes, restrictLogin };
