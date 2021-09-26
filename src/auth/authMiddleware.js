const jwt = require('jsonwebtoken');
const JWTsecret = require('./JWTsecret');

function validateJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const { email, userId, role } = jwt.verify(token, JWTsecret);
    req.email = email;
    req.userId = userId;
    req.role = role;
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  next();
}

module.exports = {
  validateJWT,
};