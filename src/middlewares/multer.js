const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }, 
});

const fileFilter = (req, file, cb) => {
  const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
  .find((acceptedFormat) => acceptedFormat === file.mimetype);

  if (isAccepted) {
      return cb(null, true);
  }

  return cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter,
});