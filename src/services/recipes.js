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
  const { role, recipeId } = payload;
  const recipe = await getRecipeById(recipeId);
  if (recipe.error) return recipe;

  if (role === 'admin') {
    const updatedRecipe = await model.updateRecipeAsAdmin(payload);
    return updatedRecipe;
  }
  const updatedRecipe = await model.updateRecipe(payload);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const recipe = await getRecipeById(id);
  if (recipe.error) return recipe;

  const response = await model.deleteRecipe(id);
  return response;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
