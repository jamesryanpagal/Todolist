// ------------- MODEL ----------
const User = require("../Model/UserModel");

// todo done
const todoDoneController = async (req, res) => {
  const id = req.params.id;
  const { todoid } = req.body;
  try {
    const done = await User.updateOne(
      { _id: id, "todos.todoid": todoid },
      { $set: { "todos.$.isDone": true } }
    );
    res.json(done);
  } catch (error) {
    res.json(error.message);
  }
};

// todo delete
const todoDeleteController = async (req, res) => {
  const id = req.params.id;
  const { todoid } = req.body;
  try {
    const deleteTodo = await User.updateOne(
      { _id: id },
      { $pull: { todos: { todoid } } }
    );
    res.json(deleteTodo);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { todoDoneController, todoDeleteController };
