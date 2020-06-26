import React from "react"

export const LinkCard = ({link}) => {
    return (
        <div className="card link-card">
            <h4>Link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></h4>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}