import React from "react";
import Signin from "./Components/Signin/Signin";
import Main from "./Components/Main/Main";

// css
import "./App.css";

function App() {
  return (
    <div className="App">
      {localStorage.getItem("isLoggedIn") ? <Main /> : <Signin />}
    </div>
  );
}

export default App;
