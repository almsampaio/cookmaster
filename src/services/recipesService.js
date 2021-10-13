const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipesModel.create(name, ingredients, preparation, userId);

  return { createdRecipe };
};

const getRecipes = async () => {
  const recipes = await recipesModel.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  
  if (!recipeById) return { message: 'recipe not found' };

  return { recipeById };
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
};
