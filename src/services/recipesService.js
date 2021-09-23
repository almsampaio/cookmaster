// const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

const errInvalidEntries = { status: 400, message: 'Invalid entries. Try again.' };

const create = async (userId, name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return errInvalidEntries;
  const createRecipe = await recipesModel.create(userId, name, ingredients, preparation);
  return ({ status: 201, recipe: createRecipe });
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return ({ status: 200, recipes });
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  return ({ status: 200, recipe });
};

const updateRecipe = async (recipeDetails) => {
  const recipe = await recipesModel.updateRecipe(recipeDetails);
  return ({ status: 200, recipe });
};

const updateRecipeImage = async ({ id, imagePath, userId }) => {
  const recipe = await recipesModel.updateRecipeImage(id, imagePath, userId);
  return ({ status: 200, recipe });
};

const removeRecipe = async (id) => {
  const { findRecipe } = await recipesModel.removeRecipe(id);
  return ({ status: 204, findRecipe });
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeImage,
  removeRecipe,
};