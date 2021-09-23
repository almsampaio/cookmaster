const recipesModel = require('../models/recipesModel');
const validationsR = require('./recipesValidations');

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  const errorMessage = await validationsR.validateRecipeCreation(name, ingredients, preparation);
  if (errorMessage) return errorMessage;

  const createdRecipe = await recipesModel.createRecipe(recipe, userId);
  return { createdRecipe };
};

module.exports = {
  getAllRecipes,
  createRecipe,
};
