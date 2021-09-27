const jwt = require('jsonwebtoken');
const SECRET = require('../CONSTANTS/SECRET');

function TokenValidator(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'jwt malformed' });
  try {
    const decoded = jwt.verify(authorization, SECRET);
    req.validated = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = TokenValidator;