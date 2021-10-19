const jwt = require('jsonwebtoken');

const {
  Secret,
} = require('../services/jwt');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (emailRegex.test(email) === false) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  if (!password || password === '') {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

const validateAdminToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, Secret);
    
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }

    req.userAdmin = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
  validateAdminToken,
};