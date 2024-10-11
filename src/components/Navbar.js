import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : "" }`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : "" }`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            
                            {
                                !localStorage.getItem('token') ?
                                <>
                                    <Link className="btn btn-outline-primary mx-2" to="/login" type="button">Login</Link>
                                    <Link className="btn btn-outline-primary mx-2" to="/signup" type="button">Sign Up</Link>
                                </>
                                :
                                <button onClick={handleLogout} className="btn btn-outline-primary mx-2" type="button">Logout</button>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
