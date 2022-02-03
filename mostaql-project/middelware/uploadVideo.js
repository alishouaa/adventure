const multer = require('multer');
const path = require('path')

const videoStorage = multer.diskStorage({
    destination: 'videos',                // مسار مجلد حفظ الفيديو
    filename: (req, file, cb) => {        // اسم الملف
        
       cb(null, file.fieldname + '_' + Date.now()  + path.extname(file.originalname))
    }
});
const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 100000000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // تحديد أنواع الملفات الممكنة mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('الملف المرفق ليس ملف فيديو أو ليس مدعوم من المخدم'))
      }
      cb(undefined, true)
   }
})

module.exports = videoUpload