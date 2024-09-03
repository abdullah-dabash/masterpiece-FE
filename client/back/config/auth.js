const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use the environment variable

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
