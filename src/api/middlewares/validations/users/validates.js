const jwt = require('jsonwebtoken');

const {
  HTTP_BAD_REQUEST,
  HTTP_FORBIDDEN,
  HTTP_UNAUTHORIZED,
} = require('../../../schemas/status');

const {
  Secret,
} = require('../../../services/users/jwt');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (emailRegex.test(email) === false) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }

  if (!password || password === '') {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

const validateAdminToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(HTTP_UNAUTHORIZED).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, Secret);
    
    if (payload.role !== 'admin') {
      return res.status(HTTP_FORBIDDEN).json({ message: 'Only admins can register new admins' });
    }

    req.userAdmin = payload;

    next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
  validateAdminToken,
};