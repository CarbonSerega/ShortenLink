import React, {useContext} from "react"
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context"

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutEventHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <span className="brand-logo">Shorten Link</span>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to = '/create' activeClassName="active-link">Create</NavLink></li>
                        <li><NavLink to = '/links' activeClassName="active-link">Links</NavLink></li>
                        <li><a href="/" onClick={logoutEventHandler}> Logout </a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}