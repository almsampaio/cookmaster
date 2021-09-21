const recipesModel = require('../models/recipesModel');
const { createError } = require('../utils/errors');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return createError;

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = { 
  createRecipe,
 };