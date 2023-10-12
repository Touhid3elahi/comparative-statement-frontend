import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">CSMS</Link> {/* Use Link for the brand link */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link> {/* Use Link for navigation */}
              </li>
          
            </ul>
        
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link> {/* Add Login button */}
              <Link to="/register" className="btn btn-outline-primary">Register</Link> {/* Add Register button */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
