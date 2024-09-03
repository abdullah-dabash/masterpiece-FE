// routes/contactRoutes.js
const express = require('express');
const ContactUs = require('../models/ContactUs'); // Import the ContactUs model
const router = express.Router();

// Route to fetch all contact messages
router.get('/all', async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 }); // Fetch messages sorted by createdAt
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
