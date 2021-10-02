import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Header.css';
const Header = (props) => {
    const [state, setState] = useState({
        name: "",
    })

    useEffect(() => {
        try {
            const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME))
            setState({name: accessToken.firstName})
        }
        catch (ex) {
            handleLogout()
        }
    })


    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        title = 'Welcome'
    }
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
    return (
        <nav className="navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">Hello {<b>{`${state.name}`}</b>} | </span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);