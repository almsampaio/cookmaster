const jwt = require('jsonwebtoken');
const { clientErrors } = require('../utils/httpStatusCodes');
const userService = require('../services/users');

const secret = '8HgYtGjKiOy789HGg';
const errorJWTFormat = { statusCode: clientErrors.unauthorized, message: 'jwt malformed' };
const errorMissingToken = { statusCode: clientErrors.unauthorized, message: 'missing auth token' };
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(errorMissingToken);

  try {
    const decoded = jwt.verify(token, secret);
    const { _id, role } = decoded;
    const user = await userService.getUserById(_id);

    if (!user) return next(errorJWTFormat);
    req.userId = _id;
    req.userRole = role;

    return next();
  } catch (err) {
    return next(errorJWTFormat);
  }
};

module.exports = validateToken;