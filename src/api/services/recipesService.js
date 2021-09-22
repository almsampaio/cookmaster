const recipesModel = require('../models/recipesModel');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const result = await recipesModel.createRecipe(userId, name, ingredients, preparation);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const getRecipesById = async (id) => {
  const result = await recipesModel.getRecipesById(id);
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
};