import React from "react"
import {Link} from "react-router-dom";


export const LinksList = ({links}) => {
    if(!links.length) {
        return <h3 className="center">
            No links!
        </h3>
    }
    return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Original</th>
                    <th>Shortened</th>
                    <th>Clicks</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {links.map((l, i) => {
                    return (
                        <tr key = {l._id}>
                            <td>{i + 1}</td>
                            <td>{l.from}</td>
                            <td>{l.to}</td>
                            <td>{l.clicks}</td>
                            <td>
                                <Link to={`/details/${l._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
    )
}