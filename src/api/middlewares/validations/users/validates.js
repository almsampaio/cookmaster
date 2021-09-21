const {
  HTTP_BAD_REQUEST,
} = require('../../../schemas/status');

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

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};