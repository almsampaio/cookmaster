const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const SECRET = 'supersecret';

const authMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    const { _id: id } = jwt.verify(token, SECRET);
    req.userId = id;
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