const router = require("express").Router();

// Middleware
const {
  verifyTokenMiddleware,
} = require("../Middleware/VerifyTokenMiddleware");

// Controller
const {
  verifyTokenController,
} = require("../Controller/VerifyTokenController");

router.route("/").post(verifyTokenMiddleware, verifyTokenController);

module.exports = router;
