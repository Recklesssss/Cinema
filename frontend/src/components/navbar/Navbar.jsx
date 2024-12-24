import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="nav">
      <div className="navbar">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <i className="search-icon">&#128269;</i>
        </div>
        <div className="navcomponents">
          <ul>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/movies'}><li>Movies</li></Link>
            <Link to={'/friends'}><li>Friends</li></Link>
            <li>Profile</li>
            <Link to={'/signup'}><li>signup</li></Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
