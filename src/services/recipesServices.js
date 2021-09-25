const recipesModel = require('../model/recipesModel');

const createRecipe = async (name, ingredients, preparation) => {
  const recipe = await recipesModel.createRecipe(name, ingredients, preparation);
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

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
};
