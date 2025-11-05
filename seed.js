const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EmailPackage = require('./server/models/EmailPackage');

dotenv.config();

const packages = [
  {
    name: 'Basic',
    description: 'Perfect for personal use',
    price: 29.99,
    features: [
      'Web-based email client',
      'Mobile app access',
      'Basic spam protection',
      '1 email address',
    ],
    storageGB: 5,
    emailsPerDay: 100,
    customDomain: false,
  },
  {
    name: 'Professional',
    description: 'Great for professionals and small businesses',
    price: 79.99,
    features: [
      'Web-based email client',
      'Mobile app access',
      'Advanced spam protection',
      '5 email addresses',
      'Email forwarding',
      'Auto-responder',
    ],
    storageGB: 25,
    emailsPerDay: 500,
    customDomain: true,
  },
  {
    name: 'Business',
    description: 'Ideal for growing businesses',
    price: 149.99,
    features: [
      'Web-based email client',
      'Mobile app access',
      'Enterprise spam protection',
      '20 email addresses',
      'Email forwarding',
      'Auto-responder',
      'Calendar integration',
      'Priority support',
    ],
    storageGB: 100,
    emailsPerDay: 2000,
    customDomain: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: 299.99,
    features: [
      'Web-based email client',
      'Mobile app access',
      'Enterprise spam protection',
      'Unlimited email addresses',
      'Email forwarding',
      'Auto-responder',
      'Calendar integration',
      '24/7 Priority support',
      'Custom branding',
      'API access',
      'Advanced analytics',
    ],
    storageGB: 500,
    emailsPerDay: 10000,
    customDomain: true,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sender', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing packages
    await EmailPackage.deleteMany({});
    console.log('Existing packages cleared');

    // Insert new packages
    await EmailPackage.insertMany(packages);
    console.log('Sample packages inserted successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
