import React, {useState} from "react"

export const CreateLink = ({onAddLink}) => {
    const [link, setLink] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        onAddLink(link)
        setLink('')
    }

    return (
        <div className="row">
            <form className="col s8 offset-s2">
                <table className='form-table'>
                    <tbody>
                    <tr>
                        <td>
                            <div className="input-field">
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