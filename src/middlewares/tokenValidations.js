const jwt = require('jsonwebtoken');

const SECRET = 'xablau';

function verify(token) {
  const payload = jwt.verify(token, SECRET);
  return payload;
}

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = verify(authorization);
    req.payload = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

module.exports = { tokenValidation };