// routes/renovationRoutes.js
const express = require('express');
const router = express.Router();
const { createRenovation, getAllRenovations } = require('../controllers/renovationController'); // Import the new function

// POST route for creating a renovation
router.post('/', createRenovation);

// GET route to fetch all renovations
router.get('/all', getAllRenovations); // Use the new controller function

module.exports = router;
