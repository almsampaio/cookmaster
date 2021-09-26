const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const loginValidations = require('../validations/loginValidations');

const privateKey = 'Seb#2021';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  loginValidations.validateFields(email, password);
  const user = await usersModel.getUserByEmail(email);
  loginValidations.validateCredentials(user, password);
  delete user.password;
  const token = jwt.sign({ data: user }, privateKey, jwtConfig);
  return { status: 200, result: { token } };
};

module.exports = { login };
