const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const validations = require('./validations');

const SECRET = 'creatingtoken';

const jwtconfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function login(email, password) {
  const user = await usersModel.getByEmail(email);

  validations.isLoginEmailValid(email, user);
  validations.isLoginPasswordValid(password, user);

  delete user.password;

  const token = jwt.sign(user, SECRET, jwtconfig);

  return token;
}

module.exports = {
  login,
};
