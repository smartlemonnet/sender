import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Shop = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/shop/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg) => {
    try {
      setPurchasing(pkg._id);
      
      // Create payment intent
      const { data } = await api.post('/shop/create-payment-intent', {
        packageId: pkg._id,
      });

      // In a real implementation, you would integrate Stripe Elements here
      // For now, we'll simulate a successful purchase
      alert(`Payment intent created for €${data.amount}. In production, this would integrate with Stripe.`);
      
      // Simulate payment completion (in production, this would be done after Stripe payment succeeds)
      // const purchaseResponse = await api.post('/shop/purchase', {
      //   packageId: pkg._id,
      //   paymentIntentId: 'pi_simulated',
      // });
      
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to purchase package');
    } finally {
      setPurchasing(null);
    }
  };

  if (loading) {
    return <div>Loading packages...</div>;
  }

  return (
    <div>
      <div className="card">
        <h1>Email Packages</h1>
        <p>Choose the perfect email package for your needs</p>
      </div>

      {packages.length === 0 ? (
        <div className="card">
          <p>No packages available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="package-grid">
          {packages.map(pkg => (
            <div key={pkg._id} className="package-card">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <div className="price">€{pkg.price}/year</div>
              
              <ul>
                <li>✓ {pkg.storageGB} GB Storage</li>
                <li>✓ {pkg.emailsPerDay} emails per day</li>
                {pkg.customDomain && <li>✓ Custom Domain Support</li>}
                {pkg.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>

              <button 
                onClick={() => handlePurchase(pkg)}
                className="btn btn-primary"
                disabled={purchasing === pkg._id}
                style={{ width: '100%', marginTop: '15px' }}
              >
                {purchasing === pkg._id ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: '30px' }}>
        <h3>Need Help?</h3>
        <p>
          All packages include 24/7 email support, spam protection, and secure SMTP/IMAP access.
          Contact us if you need a custom package for your business.
        </p>
      </div>
    </div>
  );
};

export default Shop;
