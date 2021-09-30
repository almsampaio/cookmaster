const path = require('path');
const multer = require('multer');

const destination = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination,
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
