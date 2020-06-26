import React, {useCallback, useContext, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailsPage = () => {
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const {token} = useContext(AuthContext)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const data = await request(`http://localhost:5000/api/links/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(data)

        } catch (e) {console.log(e)}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading) {
        return <Loader/>
    }



    return (
       <>
           {!loading && link && <LinkCard link={link} />}
       </>
    )
}