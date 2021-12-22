// ---------- MODEL -------
const User = require("../Model/UserModel");

const addTodoController = async (req, res) => {
  const { todoid, title, isDone } = req.body;
  const id = req.params.id;
  try {
    const add = await User.updateOne(
      { _id: id },
      { $push: { todos: { todoid, title, isDone } } }
    );
    res.json(add);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { addTodoController };
