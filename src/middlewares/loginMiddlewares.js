const jwt = require('jsonwebtoken');
const {
  // STATUS_OK,
  // STATUS_CREATE,
  // STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');
const { serviceFoundByEmail } = require('../services/usersServices');

const SECRET = 'secret-validation-string';
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, SECRET);
    console.log(`payload${payload}`);
    next();
  } catch (_e) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

const emailRequired = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

const verifyCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const userFound = await serviceFoundByEmail(email);
  if (!userFound || password !== userFound.password) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  next();
};
module.exports = {
  verifyToken,
  emailRequired,
  verifyCredentials,
};