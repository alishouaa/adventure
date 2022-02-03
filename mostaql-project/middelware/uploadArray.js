const multer  = require('multer');
const path = require('path')

/**
 * Handel multipart/form-data.   الوصول للتخزين 
 */
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

/**
 * User profile middleware.    رفع الصورة
 */
const uploadArray = multer({
    limits: { fileSize: 1024 * 1024 },
    storage: storage ,
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname)  return cb(null, true);
        cb(new Error('غبر مسموح رفع هذا الملف'));
    },
});
module.exports = uploadArray