const jwt = require('jsonwebtoken');

const SECRET = 'itsASecretAndIllNeverTellYou';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.userId = _id;
    next();
  } catch (_err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateJWT,
};