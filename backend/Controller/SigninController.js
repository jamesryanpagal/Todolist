// --------- MODEL ---------
const User = require("../Model/UserModel");

const userController = async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const create = await User.create({
      name,
      email,
      username,
      password,
    });

    const createUserToken = await create.createToken();
    res.json(createUserToken);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { userController };
