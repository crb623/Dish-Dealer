import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";

const serverAddress = process.env.REACT_APP_SERVER_DEV;

export function Login() {
  //navigate
  const navigate = useNavigate();
  //set email
  const [email, setEmail] = useState("");
  //set password
  const [password, setPassword] = useState("");
  //set error
  const [error, setError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${serverAddress}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        // console.log(userId);
        navigate("/home");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#FAA101" }}>
      <header>
        <img
          src={require("./Dish_Dealer_Logo.png")}
          width={350}
          height={200}
          alt="Dish Dealer Logo"
        />
      </header>
      <div className="login-form">
        <form class="form" onSubmit={handleLogin}>
          <div className="title">
            <h3 className="heading">Log In</h3>
          </div>
          <div className="input-container">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              Password:
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && (
            <div className="error-message">
              Invalid authentication, please check your email and password
            </div>
          )}
          <br />
          <button className="button">Log In</button>
          <br />
          <a className="button" href="/register">
            Register Page
          </a>
        </form>
      </div>
    </div>
  );
}
