const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg') {
    req.fileFilter = true;

    cb(null, false);
  }

  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;