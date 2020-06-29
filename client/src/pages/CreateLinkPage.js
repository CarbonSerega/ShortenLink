import React, {useContext, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router-dom"

export const CreateLinkPage = () => {
    const [link, setLink] = useState('')
    const {token, logout} = useContext(AuthContext)
    const history = useHistory()
    const {request} = useHttp()

    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request('http://localhost:5000/api/links/gen', 'POST', {
                    from: link
                }, {Authorization: `Bearer ${token}`})

                history.push(`/details/${data.link._id}`)

            } catch (e) {
                if(e.message === "401") {
                    logout()
                }
            }
        }
    }
    return (
       <div className="row">
           <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
               <div className="input-field">
                   <input
                       placeholder = "Insert the link"
                       id = "link"
                       type = "text"
                       value={link}
                       style={{color: 'gray'}}
                       onChange={e => setLink(e.target.value)}
                       onKeyPress={pressHandler}
                   />
               </div>
           </div>
       </div>
    )
}