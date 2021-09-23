const models = require('../models');
const { recipeValidation } = require('../schemas');
const { tokenValidation } = require('./tokenValidation');

const { HTTP_OK_STATUS, CREATED_STATUS, REQUEST_INVALID_ENTRIES } = require('../helpers');

// REQUISITO 3
const createRecipe = async (newRecipe, authorization) => {
  const { error } = recipeValidation.validate(newRecipe);
  if (error) return REQUEST_INVALID_ENTRIES;

  const { status, err, data } = await tokenValidation(authorization);
  if (err) return { status, err };

  const { _id: userId } = data;
  const recipe = newRecipe;
  recipe.userId = userId;

  const addRecipes = await models.recipesModel.createRecipes(recipe);
  return { status: CREATED_STATUS, addRecipes };
};

// REQUISITO 4
const getAllRecipes = async () => {
  const recipes = await models.recipesModel.getAllRecipes();
  return { status: HTTP_OK_STATUS, recipes };
};

module.exports = {
  tokenValidation,
  createRecipe,
  getAllRecipes,
};