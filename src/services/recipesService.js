const recipesModel = require('../models/recipesModel');
const validations = require('./validations');

async function register(recipe, token) {
  validations.isNameValid(recipe.name);
  validations.isIngredientsValid(recipe.ingredients);
  validations.isPreparationValid(recipe.preparation);

  const { _id: userId } = validations.isTokenValid(token);

  const insertedId = await recipesModel.register({ ...recipe, userId });

  return {
    userId,
    _id: insertedId,
  };
}

async function getAll() {
  const recipes = await recipesModel.getAll();
  return recipes;
}

async function getById(id) {
  const notFoundMessage = 'recipe not found';
  validations.isIdValid(id, notFoundMessage);

  const recipe = await recipesModel.getById(id);
  validations.isRecipeFound(recipe, notFoundMessage);

  return recipe;
}

async function update(id, recipe, token) {
  validations.isTokenValid(token);

  const updatedRecipe = await recipesModel.update(id, recipe);

  return updatedRecipe;
}

async function deleteRecipe(id, token) {
  validations.isTokenValid(token);
  await recipesModel.deleteRecipe(id);
}

module.exports = {
  register,
  getAll,
  getById,
  update,
  deleteRecipe,
};
