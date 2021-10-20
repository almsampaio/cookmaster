const jwt = require('jsonwebtoken');
const usersModel = require('../model/userModel');

const secret = 'secretToken';

const WITHOUT_TOKEN = 'missing auth token';
const INVALID = 'invalid token';
const MALFORMED = 'jwt malformed';

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return res.status(401).json({ message: WITHOUT_TOKEN });
  try {
    const decoded = jwt.verify(authToken, secret);
    const user = usersModel.searchEmail(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    if (err.message === INVALID || err.message === MALFORMED) {
      return res.status(401).json({ message: MALFORMED });
    }
    return next(err);
  }
}; 