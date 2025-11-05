import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    text: '',
    html: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.post('/email/send', formData);
      setSuccess(true);
      setFormData({
        to: '',
        subject: '',
        text: '',
        html: '',
      });
      setTimeout(() => {
        navigate('/emails');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Send Email</h2>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {success && (
        <div className="alert alert-success">
          Email sent successfully! Redirecting to inbox...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>To (comma-separated for multiple recipients)</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="recipient@example.com, another@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message (Plain Text)</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter your message here..."
            required
          />
        </div>

        <div className="form-group">
          <label>Message (HTML - Optional)</label>
          <textarea
            name="html"
            value={formData.html}
            onChange={handleChange}
            placeholder="<p>Enter HTML content here...</p>"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Email'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/emails')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;
