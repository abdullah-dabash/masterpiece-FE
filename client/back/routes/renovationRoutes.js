// routes/renovationRoutes.js
const express = require('express');
const router = express.Router();
const Renovation = require('../models/Renovation'); // Adjust path as necessary

// POST route for room renovation
router.post('/', async (req, res) => {
  try {
    const { wallHeight, wallWidth, name, email, phone } = req.body;
    const roomImage = req.file.path; // File path from multer

    const newRenovation = new Renovation({
      roomImage,
      wallHeight,
      wallWidth,
      name,
      email,
      phone,
    });

    await newRenovation.save();
    res.status(201).json({ message: 'Room renovation submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit renovation', error });
  }
});

module.exports = router;
