const multer = require('multer');
const path = require('path');

const upload = {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, _file, cb) => {
      const fileName = `${req.params.id}.jpeg`;
      cb(null, fileName);
    },
  }),
};

module.exports = upload;