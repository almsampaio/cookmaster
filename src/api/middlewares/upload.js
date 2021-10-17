const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}-${file.originalname}`);
  },
});

module.exports = multer({ storage });
