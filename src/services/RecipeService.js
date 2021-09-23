const Joi = require('joi');
const RecipeModel = require('../models/RecipeModel');

const schemaRecipe = Joi.object({
  name: Joi.required(),
  ingredients: Joi.required(),
  preparation: Joi.required(),
});

const errorHandling = (status, message) => ({
  status,
  message,
});

const create = async (name, ingredients, preparation) => {
  const { error } = schemaRecipe.validate({ name, ingredients, preparation });

  if (error) {
    throw errorHandling(400, 'Invalid entries. Try again.');
  }

  const recipe = await RecipeModel.create(name, ingredients, preparation);

  return recipe;
};

const getAll = async () => {
  const recipes = await RecipeModel.getAll();

  return recipes;
};

module.exports = {
  create,
  getAll,
};