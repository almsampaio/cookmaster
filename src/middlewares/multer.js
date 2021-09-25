const multer = require('multer');
const path = require('path');

const destination = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};