const model = require('../models/recipes');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const recipe = await model.createRecipe({ name, ingredients, preparation, userId });
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);

  if (!recipe) return { error: { code: 404, message: 'recipe not found' } };

  return recipe;
};

const updateRecipe = async (payload) => {
  const updatedRecipe = await model.updateRecipe(payload);
  return updatedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
