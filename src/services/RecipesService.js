const Recipes = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation, userId);
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

const updateRecipe = async (name, ingredients, preparation, id) => {
  const updatedRecipe = await Recipes.updateRecipe(name, ingredients, preparation, id);
  return { status: 200, data: updatedRecipe };
};

const deleteRecipe = async (id) => {
  await Recipes.deleteRecipe(id);
  return { status: 204 };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
