import React, { useState } from "react";
import axiosConfig from "../../../Helper/AxiosConfig/AxiosConfig";
import Spinner from "../../../Helper/Spinner/Spinner";

// css
import "../Form.css";

const LoginForm = ({ setSignup }) => {
  // --------- STATE ----------
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // RESPONSE MESSAGE STATE
  const [resMessage, setResMessage] = useState("");

  // change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosConfig.post("Login", loginDetails);
      if (data.isError) {
        setResMessage(data.errorMessage);
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data);
      localStorage.setItem("isLoggedIn", true);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form_Container">
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <h1>Login</h1>
        {/* ----------- INPUTS --------- */}

        {/* RESPONSE MESSAGE */}
        {resMessage && <section className="resMessage">{resMessage}</section>}

        {/* EMAIL */}
        <input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
        />
        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* SUBMIT BUTTON */}
        <button type="submit">{loading ? <Spinner /> : "Login"}</button>
      </form>
      {/* SIGNIN LINK */}
      <p>
        Don't have an account?{" "}
        <button type="button" onClick={() => setSignup(true)}>
          Signin
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
