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

const getOneRecipe = async (id) => {
  const recipe = await recipesModel.getOneRecipe(id);
  return recipe;
};

const editOneRecipe = async (id, name, ingredients, preparation) => {
  const editedRecipe = await recipesModel.editOneRecipe(id, name, ingredients, preparation);
  return editedRecipe;
};

const deleteOneRecipe = async (id) => {
  const recipe = await recipesModel.deleteOneRecipe(id);
  return recipe;
};

module.exports = { 
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
 };