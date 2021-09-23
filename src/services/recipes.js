const recipesModel = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const getAll = await recipesModel.getAllRecipes();
  return getAll;
};

const getRecipeById = async (id) => {
  const findedId = await recipesModel.getRecipeById(id);
  return findedId;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const edit = await recipesModel.editRecipe(id, name, ingredients, preparation);
  return edit;
};

const deleteRecipe = async (id) => {
  const deleted = await recipesModel.deleteRecipe(id);
  return deleted;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};