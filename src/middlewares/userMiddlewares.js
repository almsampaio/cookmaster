const userModel = require('../models/userModel');

const regexEmailTest = /\S+@\S+\.\S+/;

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const result = regexEmailTest.test(email);
  const existEmail = await userModel.findUserEmail(email);

  if (!email || !result) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  if (existEmail) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const result = regexEmailTest.test(email);
  const existEmail = await userModel.findUserEmail(email);

  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  if (!result || !existEmail) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validateLogin,
};
