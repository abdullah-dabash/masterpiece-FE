const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes'); // Include contact routes
const renovationRoutes = require('./routes/renovationRoutes'); // Include renovation routes
const multer = require('multer'); // Include multer for file uploads
require('dotenv').config();

const app = express();
connectDB();

// Update CORS configuration
app.use(cors({
  origin: 'http://localhost:5174', // Your frontend URL
  credentials: true, // Allow cookies to be sent and received
}));

// Session configuration
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true } // `secure: true` for HTTPS
}));

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname); // Specify the file naming convention
  }
});

const upload = multer({ storage: storage });

app.use(express.json());

// Use the upload middleware for the renovation routes
app.use('/api/renovations', upload.single('roomImage'), renovationRoutes); // Use renovation route with file upload

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', contactRoutes); // Use contact route
app.use('/uploads', express.static('uploads'));


// In your server file, add this route for handling logout
app.post('/api/admin/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
  
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));