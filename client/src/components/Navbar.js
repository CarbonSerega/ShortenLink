import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context"
import {useHttp} from "../hooks/http.hook";

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const [user, setUser] = useState('')
    const {request, loading} = useHttp()
    const {token, logout} = useContext(AuthContext)
    const history = useHistory()

    const getUser = useCallback(async() => {
        try {
            const data = await request('http://localhost:5000/api/user', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setUser(data)

        } catch (e) {
            if(e.message === "401") {
                logout()
            }
        }

    }, [token, request, logout])

    useEffect(() => {
        getUser()
    }, [getUser])

    const logoutEventHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }



    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <span className="brand-logo center">Shorten Link</span>
                    <ul className="right hide-on-med-and-down">
                        <li>{loading ? "...." : user}</li>
                        <li><a href="/" onClick={logoutEventHandler}><i className="material-icons" title="Exit">exit_to_app</i> </a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}