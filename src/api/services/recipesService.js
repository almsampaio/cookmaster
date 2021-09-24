const recipeModel = require('../models/recipeModel');

const createRecipe = async (newRecipe) => {
  // console.log(error);
  const recipe = await recipeModel.createRecipe(newRecipe);

  return recipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

module.exports = {
  createRecipe,
  getRecipes,
  
};