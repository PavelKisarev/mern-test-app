import React from 'react'

function LinkCard({ link }) {
    return (
        <div>
            <h2>LINK</h2>
            <p>Ваша ссылка ( сокращенная ) <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Исходная ссылка <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов: {link.clicks}</p>
            <p>Дата создания: {new Date(link.date).toLocaleDateString()}</p>
        </div>
    )
}

export default LinkCard
