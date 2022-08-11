import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className='navbar navbar-dark bg-dark py-3 px-3 px-sm-4'>
            <a className='navbar-brand' href="/">
                <span className="h2 mx-2 site-name">SendFast</span>
            </a>
            <div className="ms-auto d-inline">
                <Link to={'/signup'}><span className="mx-2 btn btn-dark">Signup</span></Link> 
                <Link to={'/login'}><span className="mx-2 btn btn-outline-light">Login</span></Link>
            </div>
        </nav>
    )
}