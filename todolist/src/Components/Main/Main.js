import React, { useState, useEffect } from "react";
import axiosConfig from "../../Helper/AxiosConfig/AxiosConfig";

// component
import AddTodo from "./AddTodo/AddTodo";

// css
import "./Main.css";

const Main = () => {
  // -------- STATE --------
  const [user, setUser] = useState({
    id: "",
    name: "",
    todos: [],
  });

  const [todos, setTodos] = useState([]);

  // toggle add todo
  const [toggleAddTodo, setToggleAddTodo] = useState(false);

  // searched value
  const [searched, setSearched] = useState("");

  // Get user details
  useEffect(() => {
    const user = async () => {
      const { data } = await axiosConfig.post("Verifytoken", {
        key: localStorage.getItem("token"),
      });
      setUser((prev) => ({
        ...prev,
        name: data.name,
        todos: [...data.todos],
        id: data._id,
      }));
    };

    user();
  }, []);

  // Get user todos for searched
  useEffect(() => {
    setTodos([...user.todos]);
  }, [user]);

  // Filter user todos
  useEffect(() => {
    if (searched) {
      const filtered = user.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searched.toLowerCase())
      );
      setTodos([...filtered]);
    }
  }, [user, searched]);

  // Total todos
  const totalTodos = () => {
    return user.todos.length;
  };

  // Tota finished
  const totalFinished = () => {
    const finished = user.todos.filter((todo) => todo.isDone === true);
    return finished.length;
  };

  // Todo done
  const handleTodoDone = async (e) => {
    const todoid = e.target.value;
    try {
      const { data } = await axiosConfig.post(
        `/UpdateTodo/todoDone/${user.id}`,
        { todoid }
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Todo delete
  const handleTodoDelete = async (e) => {
    const todoid = e.target.value;
    try {
      const { data } = await axiosConfig.post(
        `/UpdateTodo/todoDelete/${user.id}`,
        { todoid }
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="main_Container">
      {/* ADD TODO */}
      {toggleAddTodo && (
        <AddTodo setToggleAddTodo={setToggleAddTodo} id={user.id} />
      )}
      {/* HEADER */}
      <section className="header_Container">
        {/* SUB HEADER */}
        <section className="subHeader">
          {/* USER ICON */}
          <section className="userIcon">{user.name[0]}</section>
          {/* SEARCH */}
          <section className="search_Container">
            <button type="button">
              <i className="fas fa-search"></i>
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search todo"
              onChange={(e) => setSearched(e.target.value)}
            />
          </section>
        </section>
        {/* GREETINGS */}
        <section className="greet_Container">
          <h1>What's up, {user.name.split(" ")[0]}!</h1>
          <button type="button" onClick={() => setToggleAddTodo(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </section>
        {/* STATUS */}
        <section className="status_Container">
          <h4>
            Finished: <span>{totalFinished()}</span>
          </h4>
          <h4>
            Todos: <span>{totalTodos()}</span>
          </h4>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </section>
      {/* BODY */}
      {!searched
        ? user.todos.map((todo) => {
            return (
              <section
                key={todo.todoid}
                style={{ opacity: todo.isDone && 0.5 }}
                className="todo"
              >
                {/* ACTIONS */}
                <section className="actions_Container">
                  <button
                    className="done"
                    type="button"
                    value={todo.todoid}
                    disabled={todo.isDone}
                    onClick={handleTodoDone}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    className="delete"
                    type="button"
                    value={todo.todoid}
                    onClick={handleTodoDelete}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </section>
                {/* DETAILS */}
                <h3
                  style={{
                    textDecorationLine: todo.isDone && "line-through",
                    textDecorationColor: "black",
                    textDecorationThickness: "4px",
                  }}
                >
                  {todo.title}
                </h3>
              </section>
            );
          })
        : todos.map((todo) => {
            return (
              <section
                key={todo.todoid}
                style={{ opacity: todo.isDone && 0.5 }}
                className="todo"
              >
                {/* ACTIONS */}
                <section className="actions_Container">
                  <button
                    className="done"
                    type="button"
                    value={todo.todoid}
                    disabled={todo.isDone}
                    onClick={handleTodoDone}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    className="delete"
                    type="button"
                    value={todo.todoid}
                    onClick={handleTodoDelete}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </section>
                {/* DETAILS */}
                <h3
                  style={{
                    textDecorationLine: todo.isDone && "line-through",
                    textDecorationColor: "black",
                    textDecorationThickness: "4px",
                  }}
                >
                  {todo.title}
                </h3>
              </section>
            );
          })}
    </div>
  );
};

export default Main;
