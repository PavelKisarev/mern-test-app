import React from 'react'
import { Link } from 'react-router-dom'

function LinkList({ links }) {
    if (!links.length) {
        return (
            <p>Links array is empty</p>
        )
    }
    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Исходная ссылка</th>
                    <th>Сокращенная</th>
                    <th>Подробнее</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`} >Подробнее</Link>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}


export default LinkList
