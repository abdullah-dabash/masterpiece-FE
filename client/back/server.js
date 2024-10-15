require('dotenv').config();
const upload = require('./multerConfig'); // Adjust the path accordingly

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require('./routes/contactRoutes'); 
const renovationRoutes = require('./routes/renovationRoutes'); // New line
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const orderRoutes = require('./routes/OrederRoutes'); // Adjust the path to your routes file

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both origins
  credentials: true, // Allow cookies to be sent and received
}));




app.use(bodyParser.json());
app.use(express.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/renovation', upload.single('roomImage'), renovationRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api/favorites', favoriteRoutes);

// Serve static files from 'uploads/models' directory
app.use('/uploads/models', express.static(path.join(__dirname, 'uploads/models')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/renovation', express.static(path.join(__dirname, 'uploads/renovation')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
