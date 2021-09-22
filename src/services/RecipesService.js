const Recipes = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation);
  return { status: 201, data: newRecipe };
};

const getAllRecipes = async () => {
  const allRecipes = await Recipes.getAllRecipes();
  return { status: 200, data: allRecipes };
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
