import React from 'react';
import './Navbar.css';

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
            <li>Home</li>
            <li>Movies</li>
            <li>Friends</li>
            <li>signup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
