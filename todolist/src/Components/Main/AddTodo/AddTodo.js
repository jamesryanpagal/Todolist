import React, { useState } from "react";
import axiosConfig from "../../../Helper/AxiosConfig/AxiosConfig";
import Spinner from "../../../Helper/Spinner/Spinner";
import { v4 as uuidv4 } from "uuid";

// css
import "./AddTodo.css";

const AddTodo = ({ setToggleAddTodo, id }) => {
  // -------- STATE --------
  const [todo, setTodo] = useState({
    todoid: uuidv4(),
    title: "",
    isDone: false,
  });

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosConfig.post(`AddTodo/${id}`, todo);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addTodo_Container">
      {/* CLOSE MODAL */}
      <button
        type="button"
        className="close_Modal"
        onClick={() => setToggleAddTodo(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* ADD TODO */}
      <form onSubmit={handleSubmit}>
        <h2>Add Todo</h2>
        {/* INPUT */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        {/* SUBMIT */}
        <button type="submit">{loading ? <Spinner /> : "Add"}</button>
      </form>
    </div>
  );
};

export default AddTodo;
