const { isUndefined } = require('lodash/fp');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthorizedError,
  notFoundError } = require('../validations/Errors');
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

exports.readOne = async ({ id }) => {
  try {
    const recipe = await recipesModel.findById(id);
    return { code: StatusCodes.OK, result: recipe };
  } catch (_err) {
    throw notFoundError('recipe not found');
  }
};

exports.validateToken = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (_err) {
    throw unauthorizedError('jwt malformed');
  }
};
