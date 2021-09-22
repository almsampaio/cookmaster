const recipeModel = require('../models/recipeModel');

async function addRecipe({ name, ingredients, preparation, userId }) {
  if (!name || !ingredients || !preparation) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }

  const addedRecipe = await recipeModel.addRecipe({ name, ingredients, preparation, userId });
  return { code: 201, recipe: addedRecipe };
}

async function getAll() {
  const recipes = await recipeModel.getAll();
  return recipes;
}

async function getById(id) {
  const recipeById = await recipeModel.getById(id);
  if (!recipeById) return { code: 404, message: 'recipe not found' };
  return { code: 200, recipeById };
}

module.exports = {
  addRecipe,
  getAll,
  getById,
};