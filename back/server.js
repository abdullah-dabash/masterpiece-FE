require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
