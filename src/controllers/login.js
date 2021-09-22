const jwt = require('jsonwebtoken');
const loginService = require('../services/login');
const { successResponses } = require('../utils/httpStatusCodes');

const secret = '8HgYtGjKiOy789HGg';
const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await loginService.login(email, password);
  const { _id, role, statusCode } = response;

  if (statusCode) {
    return next(response);
  }
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(successResponses.ok).json({ token });
};

module.exports = { login };