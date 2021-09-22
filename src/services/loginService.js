const { StatusCodes } = require('http-status-codes');
const { isUndefined, isNull } = require('lodash');
const { validate } = require('email-validator');
const jwt = require('jsonwebtoken');
const { usersModel } = require('../models');
const { unauthorizedError } = require('../validations/Errors');
const { secret } = require('../validations/auth/secret');

const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

exports.login = async ({ email, password }) => {
  if ([email, password].some(isUndefined)) {
    throw unauthorizedError('All fields must be filled');
  }
  if (!validate(email)) {
    throw unauthorizedError('Incorrect username or password');
  }
  const data = await usersModel.findOne({ email });
  if (isNull(data)) {
    throw unauthorizedError('Incorrect username or password');
  }
  if (data.password !== password) {
    throw unauthorizedError('Incorrect username or password');
  }
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { code: StatusCodes.OK, token };
};
