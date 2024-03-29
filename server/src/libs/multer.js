const multer = require('multer');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

module.exports = multer({ storage });