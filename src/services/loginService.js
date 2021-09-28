const jwt = require('jsonwebtoken');
const userModels = require('../models/usersModels');

const secret = 'eumoronojambalai';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginValidation = require('./validations/loginValidations');

const login = async (email, password) => {
  loginValidation.validateRequire(email, password);
  const result = await userModels.getUsersByEmail(email);
  await loginValidation.validateUserRequired(result, password);
  delete result.password;
  const token = jwt.sign({ data: result }, secret, jwtConfig);
  return { status: 200, response: { token } };
};

module.exports = {
  login,
};
