const router = require("express").Router();

// Middleware
const { userMiddleware } = require("../Middleware/SigninMiddleware");

// Controller
const { userController } = require("../Controller/SigninController");

// Router
router.route("/").post(userMiddleware, userController);

module.exports = router;
