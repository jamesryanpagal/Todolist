import React, { useState } from "react";
import Signinform from "./SigninForm/Signinform";
import LoginForm from "./LoginForm/LoginForm";

// images
import todoImage from "../../Images/todoImage.png";

// css
import "./Signin.css";

const Signin = () => {
  // ---------- STATE ------------
  const [signup, setSignup] = useState(false);

  return (
    <div className="signin_Container">
      {/* TODO IMAGE */}
      <section className="todoImage_Container">
        <img src={todoImage} alt="" />
      </section>
      {/* SIGN IN FORM */}
      <section className="signinForm_Container">
        {signup ? (
          <Signinform setSignup={setSignup} />
        ) : (
          <LoginForm setSignup={setSignup} />
        )}
      </section>
    </div>
  );
};

export default Signin;
