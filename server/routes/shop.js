const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const EmailPackage = require('../models/EmailPackage');
const Purchase = require('../models/Purchase');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const router = express.Router();

// Get all email packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await EmailPackage.find({ active: true });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
  }
});

// Get single package
router.get('/packages/:id', async (req, res) => {
  try {
    const package = await EmailPackage.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch package', error: error.message });
  }
});

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { packageId } = req.body;
    
    const package = await EmailPackage.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(package.price * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        packageId: package._id.toString(),
        userId: req.userId,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: package.price,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
  }
});

// Process purchase
router.post('/purchase', auth, async (req, res) => {
  try {
    const { packageId, paymentIntentId } = req.body;
    
    const package = await EmailPackage.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Create purchase record
    const purchase = new Purchase({
      userId: req.userId,
      packageId: package._id,
      stripePaymentId: paymentIntentId,
      amount: package.price,
      status: 'completed',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    });

    await purchase.save();

    res.json({
      message: 'Purchase completed successfully',
      purchase,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process purchase', error: error.message });
  }
});

// Get user purchases
router.get('/my-purchases', auth, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.userId })
      .populate('packageId')
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchases', error: error.message });
  }
});

// Admin: Create package
router.post('/packages', auth, adminCheck, async (req, res) => {
  try {
    const { name, description, price, features, storageGB, emailsPerDay, customDomain } = req.body;
    
    // Validate required fields
    if (!name || !description || price === undefined || !storageGB || !emailsPerDay) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Validate numeric fields
    if (price < 0 || storageGB < 0 || emailsPerDay < 0) {
      return res.status(400).json({ message: 'Price, storage, and email limits must be positive' });
    }
    
    const package = new EmailPackage({
      name,
      description,
      price,
      features: features || [],
      storageGB,
      emailsPerDay,
      customDomain: customDomain || false,
    });

    await package.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create package', error: error.message });
  }
});

module.exports = router;
