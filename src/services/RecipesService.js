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

module.exports = { createRecipe, getAllRecipes, getRecipeById };
