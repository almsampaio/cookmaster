const jwt = require('jsonwebtoken');
const status = require('../api/status');
const modelLogin = require('../models/login');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginValidation = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(status.HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  next();
};

const tokenValidation = async (req, res) => {
  const { password, email } = req.body;
  const check = await modelLogin.modelPasswordCompare(password, email);
  const token = jwt.sign({ data: email }, password, jwtConfig);
  if (!check) {
    return res.status(status.HTTP_UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  return res.status(status.HTTP_OK_STATUS).json({ token });
};

module.exports = {
  loginValidation,
  tokenValidation,
};