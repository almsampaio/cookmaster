const Recipes = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation);
  return { status: 201, data: newRecipe };
};

const getAllRecipes = async () => {
  const allRecipes = await Recipes.getAllRecipes();
  return { status: 200, data: allRecipes };
};

const getRecipeById = async (id) => {
  const recipe = await Recipes.getRecipeById(id);
  if (!recipe) return { status: 404, message: 'recipe not found' };
  return { status: 200, data: recipe };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
