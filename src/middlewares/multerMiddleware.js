const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', '/uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = { upload };