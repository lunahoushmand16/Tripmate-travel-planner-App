import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src="/Plane Logo.png" alt="TripMate Logo" className="logo-image" />
        <span className="logo-text">TripMate</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/new-trip">New Trip</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Log Out</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;