// ------------ MODEL ---------
const User = require("../Model/UserModel");

const userMiddleware = async (req, res, next) => {
  const { name, email, username, password, confirmpassword } = req.body;
  let error = { isError: true, errorMessage: "" };
  try {
    // check inputs
    if (!name || !email || !username || !password) {
      error.errorMessage = "All inputs are required!";
      res.json(error);
      return;
    }

    // check password
    if (password !== confirmpassword) {
      error.errorMessage = "Password don't matched!";
      res.json(error);
      return;
    }

    // check email or username
    const checkEmail = await User.findOne({ email });
    const checkUsername = await User.findOne({ username });

    if (checkEmail) {
      error.errorMessage = "Email already been taken!";
      res.json(error);
      return;
    }

    if (checkUsername) {
      error.errorMessage = "Username already been taken!";
      res.json(error);
      return;
    }

    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { userMiddleware };
