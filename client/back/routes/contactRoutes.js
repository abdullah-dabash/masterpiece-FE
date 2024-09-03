const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitContactForm); // Use '/' to match '/api/contact'

module.exports = router;
