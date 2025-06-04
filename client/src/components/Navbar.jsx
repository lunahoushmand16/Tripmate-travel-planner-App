import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import Auth from '../utils/auth'; // ✅ IMPORTED
import './Navbar.css';

const Navbar = () => {
  const client = useApolloClient();     // ✅ Apollo cache
  const navigate = useNavigate();       // ✅ To redirect after logout

  // ✅ Logout function
  const handleLogout = () => {
    Auth.logout();           // Remove token
    client.clearStore();     // Clear Apollo Client cache
    navigate('/');           // Redirect to homepage
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src="/Plane Logo.png" alt="TripMate Logo" className="logo-image" />
        <span className="logo-text">TripMate</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/new-trip">New Trip</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {/* ✅ Conditionally show logout or login */}
        {Auth.loggedIn() ? (
          <li><button onClick={handleLogout} className="logout-btn">Log Out</button></li>
        ) : (
          <li><Link to="/">Log In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;