// ---------- MODEL ----------
const User = require("../Model/UserModel");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  let error = { isError: true, errorMessage: "" };
  try {
    // check email
    const findEmail = await User.findOne({
      $or: [{ email }, { username: email }],
    });
    if (!findEmail) {
      error.errorMessage = "Email dont exist";
      res.json(error);
      return;
    }

    // check password
    const checkPassword = await findEmail.verifyPassword(password);
    if (!checkPassword) {
      error.errorMessage = "wrong password";
      res.json(error);
      return;
    }

    // create token
    const createToken = await findEmail.createToken();
    res.json(createToken);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { loginController };
