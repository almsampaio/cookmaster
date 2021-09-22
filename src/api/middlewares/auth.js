const jwt = require('jsonwebtoken');
const { SECRET } = require('../services/login');

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers.authorization, SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};