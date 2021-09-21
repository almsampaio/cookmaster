const recipesModel = require('../models/recipesModel');
const { createError } = require('../utils/errors');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return createError;

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

module.exports = { 
  createRecipe,
  getAllRecipes,
 };