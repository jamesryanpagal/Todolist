require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// IMPORT ROUTES
const SigninRoutes = require("./Routes/SigninRoutes");
const LoginRoutes = require("./Routes/LoginRoutes");
const VerifyTokenRoutes = require("./Routes/VerifyTokenRoutes");
const AddTodoRoutes = require("./Routes/AddTodoRoutes");
const UpdateTodoRoutes = require("./Routes/UpdateTodoRoutes");

// SERVER MIDDLEWARE
app.use(cors());
app.use(express.json());

// PORT
const PORT = process.env.PORT || 9090;

// PATH
const path = require("path");

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// DEPLOYMENT
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/todolist/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "todolist", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

app.use("/Signin", SigninRoutes);
app.use("/Login", LoginRoutes);
app.use("/Verifytoken", VerifyTokenRoutes);
app.use("/AddTodo", AddTodoRoutes);
app.use("/UpdateTodo", UpdateTodoRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
