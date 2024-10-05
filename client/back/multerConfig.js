const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadDirectory = () => {
    const dir = 'uploads/renovation';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

createUploadDirectory();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/renovation'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = upload;
