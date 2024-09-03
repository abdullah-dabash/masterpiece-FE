const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
