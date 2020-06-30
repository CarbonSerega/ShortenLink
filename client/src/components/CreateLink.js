import React, {useEffect, useState} from "react"

export const CreateLink = ({onAddLink, links}) => {
    const [link, setLink] = useState('')
    const [invalid, setInvalid] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        if(!invalid.length) {
            if(links < 50) {
                onAddLink(link)
                setLink('')
                setInvalid('')
            } else {
                setInvalid('You can add maximum 50 links!')
            }
        }
    }

    useEffect(() => {
        if(/^[a-z]+:\/\//i.test(link) || link === '') {
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
                                className="btn-small red lighten-2"
                                onClick={e => submitHandler(e)}>Add</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}