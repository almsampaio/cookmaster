const recipesModel = require('../models/recipes');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const recipe = { userId, name, ingredients, preparation };
  const createdRecipe = await recipesModel.createRecipe(recipe);
  return createdRecipe;
};

const getRecipes = async () => recipesModel.getRecipes();

const getRecipeById = async (id) => recipesModel.getRecipeById(id);

const updateRecipe = async (id, name, ingredients, preparation) =>
  recipesModel.updateRecipe(id, name, ingredients, preparation);

const deleteRecipeById = async (id) => recipesModel.deleteRecipeById(id);

const addRecipeImageById = async (id) => recipesModel.addRecipeImageById(id);

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipeById,
  addRecipeImageById,
};