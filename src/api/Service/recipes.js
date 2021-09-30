const { StatusCodes } = require('http-status-codes');
const Model = require('../Model');
const { validations } = require('../utils');

async function postRecipe(recipeToInsert) {
  const invalidRecipe = validations.recipeFields(recipeToInsert).error;
  if (invalidRecipe) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, payload: { error: { message: 'Invalid entries. Try again.' } } };
  }

  const recipe = await Model.recipes.insertOneRecipe(recipeToInsert);
  const statusCode = StatusCodes.CREATED;

  return { statusCode, payload: { recipe } };
}

module.exports = {
  postRecipe,
};
