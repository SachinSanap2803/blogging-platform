import { useEffect, useState } from 'react';
import { FaFeatherAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <FaFeatherAlt className="navbar-icon" />
                    Blogify
                </Link>

                <div className="navbar-links">
                    <Link to="/blogs" className="navbar-link">All Blogs</Link>
                    {isLoggedIn && (
                        <>
                            <Link to="/myblogs" className="navbar-link">My Blogs</Link>
                            <Link to="/create" className="navbar-link">Create</Link>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="navbar-link">Login</Link>
                            <Link to="/register" className="navbar-link">Register</Link>
                        </>
                    )}
                </div>

                {isLoggedIn && (
                    <button onClick={handleLogout} className="navbar-logout">Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;