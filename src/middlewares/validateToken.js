const jwt = require('jsonwebtoken');

const SECRET = 'aipapai';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  
  try {
    const payload = jwt.verify(token, SECRET);
    const { _id } = payload;
    req.userId = _id;
    next();
  } catch (_error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
