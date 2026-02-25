const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private/Admin
router.post('/', upload.single('image'), (req, res) => {
    console.log('--- UPLOAD DEBUG ---');
    console.log('File received:', req.file ? req.file.filename : 'NONE');

    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Construct URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log('Generated URL:', fileUrl);

    res.status(200).json({
        success: true,
        url: fileUrl,
        filename: req.file.filename
    });
});

module.exports = router;
