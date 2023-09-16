import React, { useContext, useState } from "react";
import api from "../../ApiConfig/index";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";

const Login = () => {
  const { Login } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const response = await api.post("/login", { userData });

        if (response.data.success) {
          Login(response.data);
          navigateTo("/");
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div id="login-screen">
      <div id="login-main">
        <div id="login-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChangeValues}
            value={userData.email}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChangeValues}
            value={userData.password}
          />
          <br />

          <button>Submit</button>
        </form>
        <p>
          Don't have an account?{" "}
          <b onClick={() => navigateTo("/register")}> Register</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
