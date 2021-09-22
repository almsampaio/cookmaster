const Joi = require('joi');
const recipeModel = require('../model/recipe');
const errorObjects = require('../../utils/errorsObject');

const valideteRecipe = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) throw errorObjects.invalidEntries;
};

const create = async (name, ingredients, preparation, userId) => {
  valideteRecipe(name, ingredients, preparation);
  const result = await recipeModel.create(name, ingredients, preparation, userId);
  return result;
};

const getAll = async () => {
  console.log('passou no getAll');
  const result = await recipeModel.getAll();
  if (!result) throw errorObjects.notFound;
  return result;
};

const getOne = async (recipeId) => {
  console.log(recipeId);
  const result = await recipeModel.getOne(recipeId);
  if (!result) throw errorObjects.notFound;
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
};