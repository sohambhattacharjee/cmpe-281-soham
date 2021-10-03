import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { useAlert } from 'react-alert'

function RegistrationForm(props) {
    const alert = useAlert()
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {
        const { email, password, firstName, lastName } = state
        if (email.length && password.length && firstName.length && lastName.length) {
            const payload = {
                email, password, firstName, lastName
            }
            axios.put(API_BASE_URL, payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(response.data));
                        props.setName(response.data.firstName)
                        redirectToHome();
                    } else {
                        alert.show('Registration failed', { type: 'error' })
                    }
                })
                .catch(function (error) {
                    alert.show('Registration failed', { type: 'error' })
                });
        } else {
            alert.show('Please complete the form', { type: 'error' })
        }

    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            alert.show('Passwords do not match', { type: 'error' })
        }
    }
    return (
        <div className="register-card">
            <img alt="logo" className="logo" src="../../../possum.png" />
            <div className="header-title">Register to MyApp</div>
            <form className="register-form">
                <div className="form-group text-left">
                    <input
                        className="form-control"
                        id="firstName"
                        aria-describedby="FirstNameHelp"
                        placeholder="First Name"
                        value={state.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <input
                        className="form-control"
                        id="lastName"
                        aria-describedby="lastNameHelp"
                        placeholder="Last Name"
                        value={state.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);