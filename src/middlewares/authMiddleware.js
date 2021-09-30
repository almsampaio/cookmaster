const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const SECRET = 'supersecret';

const authMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next({ status: UNAUTHORIZED, message: 'missing auth token' });
    const { _id, role } = jwt.verify(token, SECRET);
    req.userId = _id;
    req.role = role;
    next();
  } catch (error) {
    if (error) {
      return next({
        status: UNAUTHORIZED,
        message: 'jwt malformed',
      });
    }
  }
};

module.exports = authMiddleware;