const jwt = require('jsonwebtoken');

const SECRET = 'secret-validation-string';
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, SECRET);
    console.log(payload);
    next();
  } catch (_e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  verifyToken,
};