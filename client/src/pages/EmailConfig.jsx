import React, { useState } from 'react';
import api from '../services/api';

const EmailConfig = () => {
  const [config, setConfig] = useState({
    smtp: {
      host: '',
      port: 587,
      secure: false,
      user: '',
      password: '',
    },
    imap: {
      host: '',
      port: 993,
      tls: true,
      user: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (type, field, value) => {
    setConfig({
      ...config,
      [type]: {
        ...config[type],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.put('/auth/email-config', config);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Email Server Configuration</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Configure your SMTP and IMAP servers to send and receive emails.
      </p>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {success && (
        <div className="alert alert-success">
          Configuration updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3>SMTP Configuration (Sending)</h3>
        <div className="form-group">
          <label>SMTP Host</label>
          <input
            type="text"
            value={config.smtp.host}
            onChange={(e) => handleChange('smtp', 'host', e.target.value)}
            placeholder="smtp.gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label>SMTP Port</label>
          <input
            type="number"
            value={config.smtp.port}
            onChange={(e) => handleChange('smtp', 'port', parseInt(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={config.smtp.secure}
              onChange={(e) => handleChange('smtp', 'secure', e.target.checked)}
            />
            {' '}Use SSL/TLS
          </label>
        </div>

        <div className="form-group">
          <label>SMTP Username</label>
          <input
            type="text"
            value={config.smtp.user}
            onChange={(e) => handleChange('smtp', 'user', e.target.value)}
            placeholder="your-email@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label>SMTP Password</label>
          <input
            type="password"
            value={config.smtp.password}
            onChange={(e) => handleChange('smtp', 'password', e.target.value)}
            placeholder="Your app password or password"
            required
          />
        </div>

        <hr style={{ margin: '30px 0' }} />

        <h3>IMAP Configuration (Receiving)</h3>
        <div className="form-group">
          <label>IMAP Host</label>
          <input
            type="text"
            value={config.imap.host}
            onChange={(e) => handleChange('imap', 'host', e.target.value)}
            placeholder="imap.gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label>IMAP Port</label>
          <input
            type="number"
            value={config.imap.port}
            onChange={(e) => handleChange('imap', 'port', parseInt(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={config.imap.tls}
              onChange={(e) => handleChange('imap', 'tls', e.target.checked)}
            />
            {' '}Use TLS
          </label>
        </div>

        <div className="form-group">
          <label>IMAP Username</label>
          <input
            type="text"
            value={config.imap.user}
            onChange={(e) => handleChange('imap', 'user', e.target.value)}
            placeholder="your-email@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label>IMAP Password</label>
          <input
            type="password"
            value={config.imap.password}
            onChange={(e) => handleChange('imap', 'password', e.target.value)}
            placeholder="Your app password or password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Configuration'}
        </button>
      </form>

      <div className="alert alert-info" style={{ marginTop: '30px' }}>
        <strong>Note:</strong> For Gmail users, you need to use an App Password instead of your regular password.
        Enable 2-Step Verification and generate an App Password at: 
        <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">
          {' '}https://myaccount.google.com/apppasswords
        </a>
      </div>
    </div>
  );
};

export default EmailConfig;
