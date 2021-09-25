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
    const decodedInfo = jwt.verify(token, secret);
    req.userId = decodedInfo.data.userId;
    next();
  } catch (e) {
    next({
      err: { message: 'jwt malformed' },
      statusCode: STATUS.STATUS_401_UNAUTHORIZED,
    });
  }
};

const existsToken = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({
      err: { message: 'missing auth token' },
      statusCode: STATUS.STATUS_401_UNAUTHORIZED,
    });
  }
  next();
};

module.exports = {
  verifyToken,
  existsToken,
};
