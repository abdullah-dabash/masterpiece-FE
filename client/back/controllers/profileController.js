const User = require('../models/User');

// Get the profile of the currently logged-in user
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // The user ID should be set by the authentication middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile };
