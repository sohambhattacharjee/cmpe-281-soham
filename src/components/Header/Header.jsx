import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Header.css';
const Header = (props) => {

    function renderLogout() {
        if (props.location.pathname === '/home') {
            return (
                <span className="ml-auto">
                    <a className="logout-text" onClick={() => handleLogout()}>Logout</a>
                </span>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    function getName() {
        if (!props.name) {
            try {
                return JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)).firstName
            }
            catch (ex) {
                //TODO: alert failure
                return ""
            }
        }
        return props.name
    }

    const { pathname } = props.location
    if(pathname !== '/home') {
        return null
    }

    return <nav className="navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
            <span className="h3">Hello {<b>{`${getName()}`}</b>} | </span>
            {renderLogout()}
        </div>
    </nav>

}
export default withRouter(Header);