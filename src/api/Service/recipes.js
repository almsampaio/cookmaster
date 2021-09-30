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

async function getRecipeById(id) {
  const recipe = await Model.recipes.findOneRecipeById(id);
  if (!recipe) {
    const statusCode = StatusCodes.NOT_FOUND;
    return { statusCode, payload: { error: { message: 'recipe not found' } } };
  }
  if (recipe.error) {
    const { statusCode, error } = recipe;
    return { statusCode, payload: { error } };
  }

  const statusCode = StatusCodes.OK;
  return { statusCode, payload: { recipe } };
}

async function postRecipe(recipeToInsert, userId) {
  const invalidRecipe = validations.recipeFields(recipeToInsert).error;
  if (invalidRecipe) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, payload: { error: { message: 'Invalid entries. Try again.' } } };
  }
  const recipeAndUserId = {
    ...recipeToInsert,
    userId,
  };

  const recipe = await Model.recipes.insertOneRecipe(recipeAndUserId);

  if (recipe.error) {
    const { statusCode, error } = recipe;
    return { statusCode, payload: { error } };
  }

  const statusCode = StatusCodes.CREATED;
  return { statusCode, payload: { recipe } };
}

async function putRecipeById(user, recipeId, recipeToInsert) {
  const invalidRecipe = validations.recipeFields(recipeToInsert).error;
  if (invalidRecipe) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, payload: { error: { message: 'Invalid entries. Try again.' } } };
  }
  const recipeToEdit = await Model.recipes.findOneRecipeById(recipeId);
  if (user.role !== 'admin' && user.id.toString() !== recipeToEdit.userId.toString()) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, payload: { error: { message: 'jwt malformed' } } };
  }
  const mongoReturn = await Model.recipes.updateOneRecipe(recipeId, recipeToInsert);
  if (mongoReturn.error) {
    const { statusCode, error } = mongoReturn;
    return { statusCode, payload: { error } };
  }
  const statusCode = StatusCodes.OK;
  return { statusCode, payload: mongoReturn };
}

async function deleteRecipeById(user, recipeId) {
  const recipeToEdit = await Model.recipes.findOneRecipeById(recipeId);
  if (user.role !== 'admin' && user.id.toString() !== recipeToEdit.userId.toString()) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, payload: { error: { message: 'jwt malformed' } } };
  }
  const mongoReturn = await Model.recipes.deleteOneRecipe(recipeId);
  if (mongoReturn.error) {
    const { statusCode, error } = mongoReturn;
    return { statusCode, payload: { error } };
  }
  const statusCode = StatusCodes.NO_CONTENT;
  return { statusCode, payload: mongoReturn };
}

module.exports = {
  getRecipes,
  getRecipeById,
  postRecipe,
  putRecipeById,
  deleteRecipeById,
};
