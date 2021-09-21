const multer = require('multer');
const path = require('path');
const { verify } = require('jsonwebtoken');

const pathRouter = path.join(__dirname, '..', 'uploads');
const SECRET = 'Vaitentanto123';

const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { data } = verify(token, SECRET);
    req.user = data;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

const storage = multer.diskStorage({
  destination: pathRouter,
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

module.exports = {
  authToken,
  upload,
};