const jwt = require('jsonwebtoken');
const SECRET = require('../secret');

const validateJWT = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next({ missingToken: true });
  }

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.userId = _id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateJWT };