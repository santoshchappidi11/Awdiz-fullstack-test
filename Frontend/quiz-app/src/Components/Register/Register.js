import React, { useState } from "react";
import api from "../../ApiConfig/index";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.confirmPassword &&
      userData.role
    ) {
      if (userData.password == userData.confirmPassword) {
        try {
          const response = await api.post("/register", { userData });

          if (response.data.success) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        alert("Password and confirm password does not match!");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div id="register-screen">
      <div id="register-main">
        <div id="register-header">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleChangeValues}
              value={userData.name}
            />
          </div>
          <br />
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChangeValues}
              value={userData.email}
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChangeValues}
              value={userData.password}
            />
          </div>
          <br />
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChangeValues}
              value={userData.confirmPassword}
            />
          </div>
          <br />
          <div id="role">
            <label>Select Role:</label>
            <select
              name="role"
              onChange={handleChangeValues}
              value={userData.role}
            >
              <option>User</option>
              <option>Admin</option>
            </select>
            <br />
          </div>
          <button>Submit</button>
        </form>
        <p>
          Don't have an account?{" "}
          <b onClick={() => navigateTo("/login")}> Login</b>
        </p>
      </div>
    </div>
  );
};

export default Register;
