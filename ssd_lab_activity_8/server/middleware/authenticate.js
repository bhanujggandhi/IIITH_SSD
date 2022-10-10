const jwt = require("jsonwebtoken");

const authenticate = (res, req, next) => {
  const token = req.header("token");
  if (!token)
    return res.status(401).json({ message: "User is not authenticated" });

  try {
    const decryptpass = jwt.verify(token, "supersecretkey");
    req.user = decryptpass.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid token" });
  }
};

module.exports = authenticate;
