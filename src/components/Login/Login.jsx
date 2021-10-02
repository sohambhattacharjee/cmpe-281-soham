import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import { useAlert } from 'react-alert'

const Login = (props) => {
  const alert = useAlert()
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    if (state.email !== "" && state.password !== "") {
      e.preventDefault();
      const payload = {
        email: state.email,
        password: state.password,
      };
      axios
        .post(API_BASE_URL, payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to home page..",
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(response.data));
            props.setName(response.data.firstName)
            redirectToHome();
          } else if (response.code === 400) {
            alert.show('Login failed', { type: 'error' })
          }
        })
        .catch(function (error) {
          alert.show('Login failed', { type: 'error' })
        });
    } else {
      e.preventDefault();
      alert.show('Please enter email & password', { type: 'error' })
    }
  };
  const redirectToHome = () => {
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
  };
  return (
    <div className="login-card">
      <img alt="logo" className="logo" src="../../../possum.png" />
      <div className="header-title">LogIn to MyApp</div>
      <form className="login-form">
        <div className="form-group text-left">
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </div>
  );
};

export default withRouter(Login);
