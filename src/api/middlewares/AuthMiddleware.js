const jwt = require('jsonwebtoken');

const SECRET = 'meusupersegredo';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.userId = _id;
    next();
  } catch (_err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authMiddleware,
};