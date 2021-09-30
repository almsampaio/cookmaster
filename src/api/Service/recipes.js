const { StatusCodes } = require('http-status-codes');
const Model = require('../Model');
const { validations } = require('../utils');

async function getRecipes() {
  const recipe = await Model.recipes.findRecipes();

  if (recipe.error) {
    const { statusCode, error } = recipe;
    return { statusCode, payload: { error } };
  }

  const statusCode = StatusCodes.OK;
  return { statusCode, payload: { recipe } };
}

async function postRecipe(recipeToInsert) {
  const invalidRecipe = validations.recipeFields(recipeToInsert).error;
  if (invalidRecipe) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, payload: { error: { message: 'Invalid entries. Try again.' } } };
  }

  const recipe = await Model.recipes.insertOneRecipe(recipeToInsert);
  
  if (recipe.error) {
    const { statusCode, error } = recipe;
    return { statusCode, payload: { error } };
  }

  const statusCode = StatusCodes.CREATED;
  return { statusCode, payload: { recipe } };
}

module.exports = {
  getRecipes,
  postRecipe,
};
