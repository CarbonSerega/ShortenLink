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
                <div className="input-field">
                    <input
                        placeholder = "Insert a link"
                        id = "link"
                        type = "text"
                        value={link}
                        style={{color: 'gray'}}
                        onChange={e => setLink(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn-small"
                        onClick={e => submitHandler(e)}>Add</button>
                </div>
            </form>
        </div>
    )
}