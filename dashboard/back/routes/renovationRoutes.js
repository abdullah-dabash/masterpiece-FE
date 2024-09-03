// routes/renovationRoutes.js
const express = require('express');
const router = express.Router();
const Renovation = require('../models/Renovation');

// GET route to fetch all renovations
router.get('/all', async (req, res) => {
  try {
    const renovations = await Renovation.find();
    res.json(renovations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch renovations', error });
  }
});

module.exports = router;
