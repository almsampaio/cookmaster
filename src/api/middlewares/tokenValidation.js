const message = 'jwt malformed';
const SECRET = 'secret';
const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message });
  }

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.user = _id;
  } catch (_e) {
    return res.status(401).json({ message });
  }

  next();
};

module.exports = tokenValidation;
