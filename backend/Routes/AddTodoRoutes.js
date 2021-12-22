const router = require("express").Router();

// Controller
const { addTodoController } = require("../Controller/AddTodoController");

router.route("/:id").post(addTodoController);

module.exports = router;
