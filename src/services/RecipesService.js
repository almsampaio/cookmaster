const RecipesModel = require('../models/RecipesModel');

const createRecipe = async (recipeData) => {
  const recipe = await RecipesModel.createRecipe(recipeData);

  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await RecipesModel.getAllRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await RecipesModel.getRecipeById(id);

  return recipe;
};

const editRecipe = async (id, data) => {
  const recipe = await RecipesModel.editRecipe(id, data);

  return recipe;
};

const deleteRecipe = async (id) => {
  const recipe = await RecipesModel.deleteRecipe(id);

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
