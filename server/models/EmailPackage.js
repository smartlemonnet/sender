const mongoose = require('mongoose');

const emailPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [{
    type: String,
  }],
  storageGB: {
    type: Number,
    required: true,
  },
  emailsPerDay: {
    type: Number,
    required: true,
  },
  customDomain: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmailPackage', emailPackageSchema);
