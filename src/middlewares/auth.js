const jwt = require('jsonwebtoken');

const errorMessages = require('../utils/errorMessages');

const JWT_SECRET = '123';

module.exports = (req, _res, next) => {
const token = req.headers.authorization;
const err = errorMessages.JWT_MALFORMED;

if (!token) {
  return next(err);
}

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    return next(err);
  }
};