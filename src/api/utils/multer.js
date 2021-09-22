const multer = require('multer');

const multerConfig = {
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'src/uploads');
    },
    filename: (req, _file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      // 'image/pjpeg',
      // 'image/png',
      // 'image/gif',
      // 'application/pdf',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};

module.exports = multerConfig;