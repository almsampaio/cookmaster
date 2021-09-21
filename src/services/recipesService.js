const { isUndefined } = require('lodash/fp');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthorizedError } = require('../validations/Errors');
const { secret } = require('../validations/auth/secret');
const { recipesModel } = require('../models');

exports.create = async ({ name, ingredients, preparation, decoded }) => {
  console.log(decoded);
  if ([name, ingredients, preparation].some(isUndefined)) {
    throw badRequestError('Invalid entries. Try again.');
  }
  const { _doc: { __v, ...rest } } = await recipesModel
  .create({ name, ingredients, preparation });
  const { _id: userId } = decoded.data;
 return { code: StatusCodes.CREATED, result: { ...rest, userId } };
};

exports.validateToken = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (_err) {
    throw unauthorizedError('jwt malformed');
  }
};
