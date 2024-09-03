const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt

// Fetch user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

module.exports = router;
