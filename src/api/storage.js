const multer = require('multer');
const path = require('path');

const dirUploads = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: dirUploads,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

module.exports = storage;