const multer = require('multer');
const { join } = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, join(__dirname, '..', 'uploads'));
  },

  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

module.exports = multer({ storage }).single('image');
