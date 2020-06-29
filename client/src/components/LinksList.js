import React, {useState} from "react"
import {Link} from "react-router-dom";
import {LinkItem} from "./LinkItem";


export const LinksList = ({links, onAllChecked}) => {

    const [checked, setChecked] = useState(false)

    if(!links.length) {
        return <h3 className="center">
            No links!
        </h3>
    }


    return (
            <table>
                <thead>
                <tr>
                    <th className="center">
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in"
                                value={checked}
                                onChange={e => {
                                    setChecked(e.target.checked)
                                    onAllChecked(e.target.checked)
                                }}
                                />
                            <span/>
                        </label>
                    </th>
                    <th>#</th>
                    <th>Original</th>
                    <th>Shortened</th>
                    <th>Clicks</th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                {links.map((l, i) => {
                    return (
                        <LinkItem key = {l._id} link={l} index={i} allChecked = {checked}/>
                    )
                })}

                </tbody>
            </table>
    )
}