import React, { useState } from "react";
import axiosConfig from "../../../Helper/AxiosConfig/AxiosConfig";
import Spinner from "../../../Helper/Spinner/Spinner";

// css
import "../Form.css";

const Signinform = ({ setSignup }) => {
  // --------- STATE ----------
  const [signinDetails, setSigninDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // RESPONSE MESSAGE STATE
  const [resMessage, setResMessage] = useState("");

  // change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSigninDetails((prev) => ({ ...prev, [name]: value }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format name
      const getName = signinDetails.name.toLowerCase().split(" ");
      const formatName = getName.map((name) => {
        return (name = name[0].toUpperCase() + name.substring(1));
      });

      setLoading(true);
      const { data } = await axiosConfig.post("Signin", {
        ...signinDetails,
        name: formatName.join(" "),
      });
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
        <h1>Signin</h1>
        {/* ----------- INPUTS --------- */}

        {/* RESPONSE MESSAGE */}
        {resMessage && <section className="resMessage">{resMessage}</section>}

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Fullname"
          onChange={handleChange}
        />
        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
        />
        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          onChange={handleChange}
        />

        {/* SUBMIT BUTTON */}
        <button type="submit">{loading ? <Spinner /> : "Register"}</button>
      </form>
      {/* LOGIN LINK */}
      <p>
        Already have an account?{" "}
        <button type="button" onClick={() => setSignup(false)}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signinform;
