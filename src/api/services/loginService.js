const { sign } = require('jsonwebtoken');
const { loginValidation } = require('../schemas');
const models = require('../models');
const {
  UNAUTHORIZED_EMPTY_FIELDS,
  UNAUTHORIZED_INVALID_DATA,
  HTTP_OK_STATUS,
} = require('../helpers');

// REQUISITO 2
const secret = 'mysecretdetoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (register) => {
  const { error } = loginValidation.validate(register);
  if (error) return UNAUTHORIZED_EMPTY_FIELDS;

  const userExist = await models.usersModel.usersByEmail(register.email);
  if (!userExist) return UNAUTHORIZED_INVALID_DATA;

  const token = sign({ register: userExist }, secret, jwtConfig);
  return { status: HTTP_OK_STATUS, token };
};

module.exports = {
  login,
  secret,
  jwtConfig,
};
