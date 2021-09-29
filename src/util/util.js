const multer = require('multer');
const path = require('path');

const SECRET = 'meLasquei';
const config = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const pathRouter = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _res, cb) => {
    cb(null, pathRouter);
  },
  filename: (req, _file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

module.exports = {
  SECRET,
  config,
  upload,
};