const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = async (req, res, next) => {
  const { key } = req.body;
  try {
    const verifyToken = await jwt.verify(key, process.env.JWT_SECRET);
    req.user = { id: verifyToken.id };
    next();
  } catch (error) {
    switch (error.message) {
      case "jwt malformed":
        res.json({ error: true, message: "Invalid token" });
        break;

      default:
        res.json({ error: true, message: error.message });
    }
  }
};

module.exports = { verifyTokenMiddleware };
