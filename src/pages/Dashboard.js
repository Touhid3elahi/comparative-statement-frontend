import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Import the useAuth hook

function Dashboard() {
  const { user, logout } = useAuth(); // Access user and logout function from AuthContext

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          CSMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers" className="nav-link">
                Suppliers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/materials" className="nav-link">
                Materials
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rate-input" className="nav-link">
                Rate
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/comparative-statements" className="nav-link">
                Comparative Statements
              </Link>
            </li>
          </ul>

          {user ? (
            <div>
              <p>Welcome, {user.name}</p>
              <button onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Dashboard;
