const jwt = require('jsonwebtoken');
const JwtAuthError = require('../../lib/errors/JwtAuthError');
const { SECRET } = require('../services/login');

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers.authorization, SECRET);
    req.user = payload;
    next();
  } catch (error) {
    error.message = JwtAuthError(error.message);
    return res.status(401).json({ message: error.message });
  }
};