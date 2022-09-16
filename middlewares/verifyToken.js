const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).send({
      message: "Access denied",
    });

  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    return res.status(400).send({
      message: "Invalid Token",
    });
  }
};
