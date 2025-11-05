const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: [String],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  html: {
    type: String,
  },
  attachments: [{
    filename: String,
    path: String,
  }],
  status: {
    type: String,
    enum: ['sent', 'received', 'draft', 'failed'],
    default: 'draft',
  },
  sentAt: {
    type: Date,
  },
  receivedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Email', emailSchema);
