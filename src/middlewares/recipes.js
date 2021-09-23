const { verify } = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const SECRET = 'segredomegasecreto123';

const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const { _id } = verify(token, SECRET);
    req.user = _id;
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImg = multer({ storage });

module.exports = {
  authToken,
  uploadImg,
};