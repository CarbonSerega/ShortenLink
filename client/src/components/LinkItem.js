import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom";
import {LinkContext} from "../context/link.context";

export const LinkItem = ({link, index, allChecked}) => {

    const {changeChecked} = useContext(LinkContext)
    const [checked, setChecked] = useState(false)

    const handleChecked = (_checked) => {
        setChecked(_checked)
        changeChecked(link._id, !checked)
    }

    useEffect(() => {
        setChecked(allChecked)
    }, [allChecked])

    return (
        <tr key = {link._id}>
            <td style={{textAlign: 'center'}}>
                <label>
                    <input
                        type="checkbox"
                        className="filled-in"
                        checked={checked}
                        onChange={e => {
                            handleChecked(e.target.checked)
                        }}/>
                    <span/>
                </label>
            </td>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>{link.clicks}</td>
            <td>
                <Link to={`/details/${link._id}`}>Open</Link>
            </td>
        </tr>
    )
}