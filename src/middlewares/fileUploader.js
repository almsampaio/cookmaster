const multer = require('multer');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: dirPath,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
