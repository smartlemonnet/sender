import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <div>
          <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>Sender</Link>
          <Link to="/shop">Shop</Link>
          {user && (
            <>
              <Link to="/emails">My Emails</Link>
              <Link to="/send">Send Email</Link>
              <Link to="/config">Settings</Link>
            </>
          )}
        </div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: '15px' }}>Welcome, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
