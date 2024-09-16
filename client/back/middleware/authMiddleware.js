const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Received Token:', token);

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: 'User not found' });
    
    console.log('User:', req.user);
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
