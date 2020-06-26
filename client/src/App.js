import React from 'react'
import 'materialize-css'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/auth.context";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthed = !!token
    const routes = useRoutes(isAuthed)
    if(!ready) {
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthed
        }}>
            <BrowserRouter>
                {isAuthed && <Navbar/>}
                <div className="App">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
