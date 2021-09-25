const recipeModel = require('../models/recipeModel');

const notFoundMessage = 'recipe not found';

const createRecipe = async (newRecipe) => {
  // console.log(error);
  const recipe = await recipeModel.createRecipe(newRecipe);

  return recipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  console.log(id);

  if (!recipe) return { code: 404, message: notFoundMessage };

  return recipe;
};

const editRecipe = async (newData) => {
  const edited = await recipeModel.editRecipe(newData);

  if (!edited) return { code: 404, message: notFoundMessage };

  return edited;
};

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  editRecipe,
};