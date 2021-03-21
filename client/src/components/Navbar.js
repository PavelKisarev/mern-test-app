import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

    const history = useHistory()

    const auth = React.useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-2">
                <NavLink to="/">
                    <span className="brand-logo">Home</span>
                </NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><button onClick={logoutHandler} className="btn red darken-1">Logout</button></li>
                </ul>
            </div>
        </nav>
    )
}