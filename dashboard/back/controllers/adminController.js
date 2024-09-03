const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === Admin.username && password === Admin.password) {
    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
