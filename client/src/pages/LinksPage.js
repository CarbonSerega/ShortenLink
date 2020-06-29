import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {LinkContext} from "../context/link.context"
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";
import {FloatingButton} from "../components/FloatingButton";
import {CreateLink} from "../components/CreateLink";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const [checkedLinks, setCheckedLinks] = useState(new Set())
    const {loading, request} = useHttp()
    const {token, logout} = useContext(AuthContext)

    const [allChecked, setAllChecked] = useState(false)

    const getLinks = useCallback(async() => {

        try {
            const data = await request('http://localhost:5000/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(data)

        } catch (e) {
            if(e.message === "401") {
                logout()
            }
        }

    }, [token, request, logout])

    const deleteHandler = useCallback(async() => {

        if(checkedLinks.size !== 0) {
            try {
                await request('http://localhost:5000/api/links', 'DELETE', [...checkedLinks], {
                    Authorization: `Bearer ${token}`
                })

                let nlinks = [...links]

                checkedLinks.forEach(l => {
                    nlinks = nlinks.filter(n => n._id !== l)
                })

                setLinks(nlinks)

            } catch (e) {
                if (e.message === "401") {
                    logout()
                }
            } finally {
                setCheckedLinks(new Set())
            }
        }

    }, [token, request, logout, checkedLinks])


    const createHandler = useCallback(async(link) => {
        if(link.replace(/\s/g,"") !== "" && !links.filter(l => l.from === link).length) {
            try {
                const data = await request('http://localhost:5000/api/links/gen', 'POST', {
                    from: link
                }, {Authorization: `Bearer ${token}`})


                setLinks([...links, data.link])
            } catch (e) {
                if (e.message === "401") {
                    logout()
                }
            }
        }

    }, [token, request, logout, links])


    useEffect(() => {
        getLinks()
    }, [getLinks])

    useEffect(() => {
        setAllChecked(checkedLinks.size === links.length)
    }, [checkedLinks, links])

    if(loading) {
        return <Loader/>
    }

    const changeChecked = (id, checked) => {
        let ncheckedLinks = new Set(checkedLinks)
        if(checked) {
            ncheckedLinks.add(id)
        }
        else {
            ncheckedLinks =
                new Set(([...ncheckedLinks].filter(l => l !== id)))
        }

        setCheckedLinks(ncheckedLinks)
    }

    const changeAllChecked = (isAllChecked) => {
        let nchecked = new Set(checkedLinks)

        if(isAllChecked) {
            links.forEach(l => nchecked.add(l._id))
        } else {
            nchecked.clear()
        }

        setCheckedLinks(nchecked)
    }


    return (
        <LinkContext.Provider value={{changeChecked}}>
           <>
               {!loading && <FloatingButton onDelete = {deleteHandler} />}

               {!loading && <CreateLink onAddLink={createHandler} />}

               {!loading && <LinksList links={links} onAllChecked={changeAllChecked} allChecked={allChecked}/>}
           </>
        </LinkContext.Provider>
    )
}