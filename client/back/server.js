require('dotenv').config();

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
const orderRoutes = require('./routes/OrederRoutes'); // Adjust the path to your routes file

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies to be sent and received
}));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/renovation', upload.single('roomImage'), renovationRoutes); // Renovation routes with file upload
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', orderRoutes);

// Serve static files from 'uploads/models' directory
app.use('/uploads/models', express.static(path.join(__dirname, 'uploads/models')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
