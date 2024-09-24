// controllers/renovationController.js
const Renovation = require('../models/Renovation'); // Adjust path as necessary

const createRenovation = async (req, res) => {
  try {
    const { wallHeight, wallWidth, name, email, phone } = req.body;
    const roomImage = `http://localhost:5000/${req.file.path}`; // Include full URL

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
};

// New function to get all renovations
const getAllRenovations = async (req, res) => {
  try {
    const renovations = await Renovation.find();
    res.json(renovations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch renovations', error });
  }
};

module.exports = {
  createRenovation,
  getAllRenovations, // Export the new function
};
