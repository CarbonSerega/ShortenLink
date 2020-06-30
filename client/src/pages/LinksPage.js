import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {LinkContext} from "../context/link.context"
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";
import {FloatingButton} from "../components/FloatingButton";
import {CreateLink} from "../components/CreateLink";
import {useMsg} from "../hooks/msg.hook";

import jsPDF from 'jspdf'
import {usePdf} from "../hooks/pdf.hook";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const [checkedLinks, setCheckedLinks] = useState(new Set())
    const {loading, request} = useHttp()
    const {token, logout} = useContext(AuthContext)
    const message = useMsg()
    const pdf = usePdf()

    const [allChecked, setAllChecked] = useState(0)

    const getLinks = useCallback(async() => {

        try {
            const data = await request('http://localhost:5000/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(data)

        } catch (e) {
            if(e.message === "401") {
                logout()
            } else {
                message("Something went wrong :(")
            }
        }

    }, [token, request, logout, message])

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
                } else {
                    message("Something went wrong :(")
                }
            } finally {
                setCheckedLinks(new Set())
            }
        } else {
            message("Select links you want to delete")
        }

    }, [token, request, logout, checkedLinks, links, message])


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
                } else {
                    message("Something went wrong :(")
                }
            }
        }

    }, [token, request, logout, links, message])


    const saveHandler = () => {

        if(checkedLinks.size !== 0) {
            let _links = []

            checkedLinks.forEach(id => {
                _links = [..._links, ...links.filter(l => l._id === id)]
            })
            pdf(_links)
        } else {
            message("Select links you want to export to pdf")
        }

    }


    useEffect(() => {
        getLinks()
    }, [getLinks])

    useEffect(() => {
        if(checkedLinks.size === links.length && links.length !== 0) {
            setAllChecked(2)
        } else if(checkedLinks.size < links.length && checkedLinks.size > 0) {
            setAllChecked(1)
        } else {
            setAllChecked(0)
        }
    }, [checkedLinks, links, getLinks])

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
               {!loading && <FloatingButton onDelete = {deleteHandler} onSave = {saveHandler} />}

               {!loading && <CreateLink onAddLink={createHandler} links = {links.length}/>}

               {!loading && <LinksList links={links} onAllChecked={changeAllChecked} allChecked={allChecked}/>}
           </>
        </LinkContext.Provider>
    )
}