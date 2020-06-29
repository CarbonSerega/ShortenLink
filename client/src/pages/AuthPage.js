import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"
import {useMsg} from "../hooks/msg.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMsg()
    const {login}  = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeEventHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerEventHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginEventHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
            login(data.token, data.userId)
            message(data.message)
        } catch (e) {}
    }

    return (
       <div className="row">
           <div className="col s6 center offset-s3">
                <h2>Shorten the Link!</h2>
               <form className="card red lighten-1">
                   <div className="card-content white-text">
                       <span className="card-title">Authorization</span>
                       <div style={{marginTop: 40}}>
                           <div className="input-field">
                               <input
                                   placeholder="Enter your e-mail"
                                   id="email"
                                   type="email"
                                   className="validate white-input white-text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeEventHandler}/>

                               <input
                                   placeholder="Enter your password"
                                   id="password"
                                   type="password"
                                   className="validate white-input white-text"
                                   name="password"
                                   value={form.password}
                                   onChange={changeEventHandler}/>

                           </div>
                       </div>
                   </div>
                   <div className="card-action">
                       <button
                           className="btn red lighten-2"
                           type="submit"
                           onClick={e => loginEventHandler(e)}
                           disabled={loading}
                       >
                           Login</button>
                       <button
                           className="btn red darken-4"
                           style={{marginLeft: 10}}
                           onClick={registerEventHandler}
                            disabled={loading}
                       >
                           Register</button>
                   </div>
               </form>
           </div>
       </div>
    )
}