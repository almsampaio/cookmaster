const jwt = require('jsonwebtoken');
const secret = require('../util/secret');
const STATUS = require('../util/myConstants');

const verifyToken = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({
      err: { message: 'jwt malformed' },
      statusCode: STATUS.STATUS_401_UNAUTHORIZED,
    });
  }
  try {
    jwt.verify(token, secret);
    next();
  } catch (e) {
    next({
      err: { message: 'jwt malformed' },
      statusCode: STATUS.STATUS_401_UNAUTHORIZED,
    });
  }
};

module.exports = {
  verifyToken,
};
