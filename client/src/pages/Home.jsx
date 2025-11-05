import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="card">
        <h1>Welcome to Sender</h1>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>
          Your complete email management solution and email account marketplace.
        </p>
      </div>

      <div className="card">
        <h2>Features</h2>
        <ul style={{ marginTop: '15px', lineHeight: '2' }}>
          <li>✉️ Send and receive emails with your own SMTP/IMAP configuration</li>
          <li>📧 Manage your inbox efficiently</li>
          <li>🛒 Browse and purchase email packages</li>
          <li>🔒 Secure authentication and data protection</li>
          <li>⚙️ Flexible email server configuration</li>
        </ul>
      </div>

      {!user && (
        <div className="card">
          <h2>Get Started</h2>
          <p style={{ marginTop: '15px', marginBottom: '20px' }}>
            Create an account to start managing your emails and explore our email packages.
          </p>
          <Link to="/register">
            <button className="btn btn-primary">Register Now</button>
          </Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>
            <button className="btn btn-secondary">Login</button>
          </Link>
        </div>
      )}

      {user && (
        <div className="card">
          <h2>Quick Actions</h2>
          <div style={{ marginTop: '15px' }}>
            <Link to="/send">
              <button className="btn btn-primary" style={{ marginRight: '10px' }}>Send Email</button>
            </Link>
            <Link to="/emails">
              <button className="btn btn-secondary" style={{ marginRight: '10px' }}>View Emails</button>
            </Link>
            <Link to="/shop">
              <button className="btn btn-secondary">Browse Packages</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
