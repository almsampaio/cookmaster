const recipesModel = require('../models/recipesModel');
const validationsR = require('./recipesValidations');

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    const errorMessage = validationsR.validateRecipeId();
    return { errorMessage };
  }
  return { recipe };
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
  getRecipeById,
  createRecipe,
};
