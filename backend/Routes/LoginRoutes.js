const router = require("express").Router();

// Controller
const { loginController } = require("../Controller/LoginController");

router.route("/").post(loginController);

module.exports = router;
