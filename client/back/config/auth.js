const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use the environment variable

const generateToken = (user) => {
  // Set the token to expire in 1 hour (3600 seconds)
  return jwt.sign({ id: user._id }, JWT_SECRET);
};

module.exports = { generateToken };
