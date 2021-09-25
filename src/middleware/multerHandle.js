const path = require('path');
const multer = require('multer');

const destination = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination,
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
