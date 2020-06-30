import React, {useContext, useEffect, useState} from "react"

export const CreateLink = ({onAddLink}) => {
    const [link, setLink] = useState('')
    const [invalid, setInvalid] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        if(!invalid.length) {
            onAddLink(link)
            setLink('')
        }
    }

    useEffect(() => {
        if(/^[a-z]+:\/\//i.test(link)) {
            setInvalid('')
        } else {
            setInvalid('Please, input the link correctly!')
        }
    }, [link])

    return (
        <div className="row">
            <form className="col s8 offset-s2">

                <table className='form-table'>
                    <tbody>
                    <tr>
                        <td>
                            <div className="input-field">
                              <span className="text-darken-3 red-text">{invalid}</span>
                            <input
                                placeholder = "Insert a link"
                                id = "link"
                                type = "text"
                                value={link}
                                style={{color: 'gray'}}
                                onChange={e => setLink(e.target.value)}
                            /></div>
                        </td>

                        <td>
                            <button
                                type="submit"
                                className="btn-floating red lighten-2"
                                onClick={e => submitHandler(e)}><i className="material-icons">add</i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}