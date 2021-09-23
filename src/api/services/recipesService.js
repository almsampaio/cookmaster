const models = require('../models');
const { recipeValidation } = require('../schemas');
const { tokenValidation } = require('./tokenValidation');

const { CREATED_STATUS, REQUEST_INVALID_ENTRIES } = require('../helpers');

const createRecipe = async (newRecipe, authorization) => {
  const token = await tokenValidation(authorization);
  
  const { error } = recipeValidation.validate(newRecipe);
  if (error) return REQUEST_INVALID_ENTRIES;

  const { _id: userId } = token;
  const recipe = newRecipe;
  recipe.userId = userId;

  const addRecipes = await models.recipesModel.createRecipes(recipe);
  return { status: CREATED_STATUS, addRecipes };
};

module.exports = {
  tokenValidation,
  createRecipe,
};