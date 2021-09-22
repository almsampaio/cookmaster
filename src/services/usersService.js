const { StatusCodes } = require('http-status-codes');
const { isUndefined } = require('lodash');
const { validate } = require('email-validator');
const { usersModel } = require('../models');
const { conflictError, badRequestError, forbiddenError } = require('../validations/Errors');

exports.create = async ({ name, email, password }) => {
  if ([name, email, password].some(isUndefined) || !validate(email)) {
    throw badRequestError('Invalid entries. Try again.');
  }
  const alreadyExists = await usersModel.findOne({ email });
  if (alreadyExists) throw conflictError('Email already registered');
  const { _doc: { password: _, ...result } } = await usersModel
    .create({ name, email, password, role: 'user' });
  return { code: StatusCodes.CREATED, result };
};

exports.createAdmin = async ({ name, email, password }) => {
  if ([name, email, password].some(isUndefined) || !validate(email)) {
    throw badRequestError('Invalid entries. Try again.');
  }
  const alreadyExists = await usersModel.findOne({ email });
  if (alreadyExists) throw conflictError('Email already registered');
  const { _doc: { password: _, ...result } } = await usersModel
    .create({ name, email, password, role: 'admin' });
  return { code: StatusCodes.CREATED, result };
};

exports.isAdmin = async (decoded) => {
  const { role } = decoded.data;
  console.log(role);
  if (role !== 'admin') throw forbiddenError('Only admins can register new admins');
  return decoded;
};
