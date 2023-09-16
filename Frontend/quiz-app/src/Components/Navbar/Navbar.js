import React, { useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";

const Navbar = () => {
  const { state, Logout } = useContext(AuthContexts);
  const navigateTo = useNavigate();

  return (
    <div id="navbar">
      <div id="left">
        <h2 onClick={() => navigateTo("/")}>Quiz</h2>
      </div>
      <div id="middle">
        {state?.currentUser?.role == "Admin" && (
          <>
            <p onClick={() => navigateTo("/add-question")}>Add Quiz Question</p>
            <p onClick={() => navigateTo("/your-questions")}>
              Your Quiz Questions
            </p>
          </>
        )}
      </div>
      <div id="right">
        {state?.currentUser?.name && (
          <>
            <p>
              {state?.currentUser?.name}({state?.currentUser?.role})
            </p>
            <p onClick={Logout}>Logout</p>
          </>
        )}
        {!state?.currentUser?.name && (
          <>
            <p onClick={() => navigateTo("/login")}>Register/Login</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
