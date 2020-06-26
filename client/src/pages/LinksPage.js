import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState('')
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const getLinks = useCallback(async() => {
        try {
            const data = await request('http://localhost:5000/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        } catch (e) { console.log(e) }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if(loading) {
        return <Loader/>
    }

    return (
       <>
           {!loading && <LinksList links={links}/>}
       </>
    )
}