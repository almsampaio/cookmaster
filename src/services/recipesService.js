const { isUndefined } = require('lodash');
const { StatusCodes } = require('http-status-codes');
const { badRequestError,
  notFoundError } = require('../validations/Errors');
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

exports.update = async ({ id, name, ingredients, preparation }) => {
  try {
    await recipesModel
    .findByIdAndUpdate(id, { name, ingredients, preparation });
    const result = await recipesModel.findById(id);
    return { code: StatusCodes.OK, result };
  } catch (_err) {
    throw notFoundError('recipe not found');
  }
};

exports.delete = async ({ id }) => {
  await recipesModel.findByIdAndDelete(id);
  return { code: StatusCodes.NO_CONTENT };
};

exports.updateImage = async ({ id, filename }) => {
  try {
    await recipesModel
    .findByIdAndUpdate(id, { image: `localhost:3000/src/uploads/${filename}` });
    const result = await recipesModel.findById(id);
    return { code: StatusCodes.OK, result };
  } catch (_err) {
    throw notFoundError('recipe not found');
  }
};
