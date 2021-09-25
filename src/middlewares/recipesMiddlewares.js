const jwt = require('jsonwebtoken');

const {
  // STATUS_OK,
  // STATUS_CREATE,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');

const SECRET = 'secret-validation-string';

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (_e) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

const verifyFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(STATUS_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyFields,
};