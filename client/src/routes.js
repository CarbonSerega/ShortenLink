import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {DetailsPage} from "./pages/DetailsPage";
import {AuthPage} from "./pages/AuthPage";


export const useRoutes = isAuthed => {
    if(isAuthed) {
        return (
            <Switch>
                <Route path = "/links" exact>
                    <LinksPage />
                </Route>
                <Route path = "/details/:id" >
                    <DetailsPage />
                </Route>
                <Redirect to = "/links"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to = "/" />
            </Switch>
        )
    }
}