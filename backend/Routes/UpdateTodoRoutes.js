const router = require("express").Router();

// Controller
const {
  todoDoneController,
  todoDeleteController,
} = require("../Controller/UpdateTodoController");

// todo done
router.route("/todoDone/:id").post(todoDoneController);

// delete todo
router.route("/todoDelete/:id").post(todoDeleteController);

module.exports = router;
