const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },

});

const upload = multer({ storage });

module.exports = upload;
