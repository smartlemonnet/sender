import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const response = await api.get('/email/list');
      setEmails(response.data.emails);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewEmails = async () => {
    try {
      setFetching(true);
      await api.get('/email/fetch');
      await fetchEmails();
      alert('Emails fetched successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to fetch new emails');
    } finally {
      setFetching(false);
    }
  };

  const deleteEmail = async (id) => {
    if (!window.confirm('Are you sure you want to delete this email?')) {
      return;
    }

    try {
      await api.delete(`/email/${id}`);
      setEmails(emails.filter(email => email._id !== id));
      setSelectedEmail(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete email');
    }
  };

  if (loading) {
    return <div>Loading emails...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>My Emails</h2>
          <button 
            onClick={fetchNewEmails} 
            className="btn btn-primary"
            disabled={fetching}
          >
            {fetching ? 'Fetching...' : 'Fetch New Emails'}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {emails.length === 0 ? (
        <div className="card">
          <p>No emails yet. Try sending an email or fetching from your server.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div>
            <ul className="email-list">
              {emails.map(email => (
                <li 
                  key={email._id} 
                  className={`email-item ${selectedEmail?._id === email._id ? 'selected' : ''}`}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    border: selectedEmail?._id === email._id ? '2px solid #007bff' : 'none'
                  }}
                >
                  <h3>{email.subject}</h3>
                  <p>From: {email.from}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(email.createdAt).toLocaleString()}
                  </p>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      backgroundColor: email.status === 'sent' ? '#28a745' : '#17a2b8',
                      color: 'white'
                    }}
                  >
                    {email.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {selectedEmail && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h2>{selectedEmail.subject}</h2>
                  <p><strong>From:</strong> {selectedEmail.from}</p>
                  <p><strong>To:</strong> {selectedEmail.to.join(', ')}</p>
                  <p><strong>Date:</strong> {new Date(selectedEmail.createdAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => deleteEmail(selectedEmail._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <hr style={{ margin: '20px 0' }} />
              <div>
                {selectedEmail.html ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
                ) : (
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedEmail.text}</pre>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailList;
