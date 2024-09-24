    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    // Create the uploads/renovation directory if it doesn't exist
    const createUploadDirectory = () => {
    const dir = 'uploads/renovation';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    };

    createUploadDirectory();

    // Configure Multer storage
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/renovation'); // Save files in the 'uploads/renovation' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
    }
    });

    // Filter to allow only image files
    const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
    };

    // Initialize multer
    const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
    });

    module.exports = upload;
