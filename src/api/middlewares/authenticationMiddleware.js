const jwt = require('jsonwebtoken');

const MISSING_TOKEN = 'missing auth token';
const JTW_MALFORMED = 'jwt malformed';
const KEY = 'privateKey';

const STATUS_UNAUTHORIZED = 401;

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(STATUS_UNAUTHORIZED).json({ message: MISSING_TOKEN });

  try {
    const { _id } = jwt.verify(token, KEY);
    req.userId = _id;
    next();
  } catch (_err) {
    res.status(STATUS_UNAUTHORIZED).json({ message: JTW_MALFORMED });
  }
};

module.exports = {
  authenticationMiddleware,
};