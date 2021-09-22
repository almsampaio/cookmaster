const jwt = require('jsonwebtoken');

const { JWT_MALFORMED, UNAUTHORIZED_MISSING_TOKEN } = require('../utils/errorMessages');

const JWT_SECRET = '123';

module.exports = (req, _res, next) => {
const token = req.headers.authorization;

if (!token) return next(UNAUTHORIZED_MISSING_TOKEN);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    return next(JWT_MALFORMED);
  }
};