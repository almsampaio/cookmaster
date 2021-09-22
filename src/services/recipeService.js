const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
        err: { message: 'Invalid entries. Try again.', status: 400 } };
  }
  const recipe = await recipesModel.insertRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    return { err: { status: 404, message: 'recipe not found' } };
  }
  return recipe;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const recipe = await recipesModel.updateRecipeById(id, name, ingredients, preparation);

  if (!recipe) {
    return { err: { status: 404, message: 'recipe not found' } };
  }
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};
