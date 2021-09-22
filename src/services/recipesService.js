const { isUndefined } = require('lodash/fp');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthorizedError } = require('../validations/Errors');
const { secret } = require('../validations/auth/secret');
const { recipesModel } = require('../models');

exports.create = async ({ name, ingredients, preparation, decoded }) => {
  if ([name, ingredients, preparation].some(isUndefined)) {
    throw badRequestError('Invalid entries. Try again.');
  }
  const { _id: userId } = decoded.data;
  const { _doc: { ...result } } = await recipesModel
  .create({ name, ingredients, preparation, userId });
 return { code: StatusCodes.CREATED, result };
};

exports.readMany = async () => {
  const recipes = await recipesModel.find({});
  return { code: StatusCodes.OK, result: recipes };
};

exports.validateToken = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (_err) {
    throw unauthorizedError('jwt malformed');
  }
};
