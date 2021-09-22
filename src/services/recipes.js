const Joi = require('joi');

const recipesModel = require('../models/recipes');

const INVALID_ENTRIES = { message: 'Invalid entries. Try again.', status: 400 };

const validateRecipe = Joi.object({
  name: Joi.string().min(5).required(),
  ingredients: Joi.string().min(5).required(),
  preparation: Joi.string().min(5).required(),
});

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { value, error } = validateRecipe.validate({ name, ingredients, preparation });

  if (error) return { error: INVALID_ENTRIES };

  value.userId = userId;

  const recipe = await recipesModel.createRecipe(value);

  return { result: { recipe } };
};

const getRecipes = async () => {
  const result = await recipesModel.getRecipes();

  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
};
