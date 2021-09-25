const recipesModel = require('../model/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const recipesUpdate = async (name, ingredients, preparation, id) => {
  await recipesModel.updateRecipe(name, ingredients, preparation, id);
  const recipe = await recipesModel.getById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  recipesUpdate,
};
