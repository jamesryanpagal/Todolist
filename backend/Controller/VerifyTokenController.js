// ---------- MODEL ----------
const User = require("../Model/UserModel");

const verifyTokenController = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { verifyTokenController };
