const RecipesModel = require('../models/RecipesModel');

const createRecipe = async (recipeData) => {
  const recipe = await RecipesModel.createRecipe(recipeData);

  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await RecipesModel.getAllRecipes();

  return recipes;
};

module.exports = { createRecipe, getAllRecipes };
