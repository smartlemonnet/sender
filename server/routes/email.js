const express = require('express');
const nodemailer = require('nodemailer');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const Email = require('../models/Email');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Send email
router.post('/send', auth, async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    const user = await User.findById(req.userId);

    if (!user.emailConfig || !user.emailConfig.smtp) {
      return res.status(400).json({ message: 'SMTP configuration not set' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: user.emailConfig.smtp.host,
      port: user.emailConfig.smtp.port,
      secure: user.emailConfig.smtp.secure,
      auth: {
        user: user.emailConfig.smtp.user,
        pass: user.emailConfig.smtp.password,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: user.emailConfig.smtp.user,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      text,
      html,
    });

    // Save to database
    const email = new Email({
      userId: user._id,
      from: user.emailConfig.smtp.user,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      status: 'sent',
      sentAt: new Date(),
    });
    await email.save();

    res.json({ message: 'Email sent successfully', email, messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Fetch emails from IMAP server
router.get('/fetch', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user.emailConfig || !user.emailConfig.imap) {
      return res.status(400).json({ message: 'IMAP configuration not set' });
    }

    const config = {
      imap: {
        user: user.emailConfig.imap.user,
        password: user.emailConfig.imap.password,
        host: user.emailConfig.imap.host,
        port: user.emailConfig.imap.port,
        tls: user.emailConfig.imap.tls,
        authTimeout: 3000,
      },
    };

    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const emails = [];

    for (const item of messages) {
      const all = item.parts.find(part => part.which === 'TEXT');
      const id = item.attributes.uid;
      const idHeader = 'Imap-Id: ' + id + '\r\n';

      const parsed = await simpleParser(idHeader + all.body);

      const email = new Email({
        userId: user._id,
        from: parsed.from.text,
        to: [user.emailConfig.imap.user],
        subject: parsed.subject,
        text: parsed.text,
        html: parsed.html,
        status: 'received',
        receivedAt: parsed.date || new Date(),
      });

      await email.save();
      emails.push(email);
    }

    connection.end();

    res.json({ message: 'Emails fetched successfully', count: emails.length, emails });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch emails', error: error.message });
  }
});

// Get all emails for user
router.get('/list', auth, async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    // Validate and sanitize limit and skip
    const parsedLimit = Math.min(Math.max(parseInt(limit) || 50, 1), 100);
    const parsedSkip = Math.max(parseInt(skip) || 0, 0);
    
    const query = { userId: req.userId };
    if (status) {
      query.status = status;
    }

    const emails = await Email.find(query)
      .sort({ createdAt: -1 })
      .limit(parsedLimit)
      .skip(parsedSkip);

    const total = await Email.countDocuments(query);

    res.json({ emails, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch emails', error: error.message });
  }
});

// Get single email
router.get('/:id', auth, async (req, res) => {
  try {
    const email = await Email.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.json(email);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch email', error: error.message });
  }
});

// Delete email
router.delete('/:id', auth, async (req, res) => {
  try {
    const email = await Email.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!email) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete email', error: error.message });
  }
});

module.exports = router;
