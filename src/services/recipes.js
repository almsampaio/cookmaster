const recipeModel = require('../models/recipes');

const INVALID = 'Invalid entries. Try again.';
const NOT_FOUND = 'recipe not found';

const checkRecipe = (name, ingredients, preparation) => {
  if (typeof name !== 'string') return { message: INVALID, error: 400 };
  if (typeof ingredients !== 'string') return { message: INVALID, error: 400 };
  if (typeof preparation !== 'string') return { message: INVALID, error: 400 };
  return false;
};

const addRecipe = async (recipe) => {
  const { name, ingredients, preparation, userId } = recipe;

  const check = checkRecipe(name, ingredients, preparation);
  if (check) return check;

  const newRecipe = { name, ingredients, preparation, userId };
  const insertedRecipe = await recipeModel.addRecipe(newRecipe);

  return insertedRecipe;
};

const allRecipes = async () => {
  const insertedRecipe = await recipeModel.allRecipes();

  return insertedRecipe;
};

const recipeId = async (id) => {
  const recipe = await recipeModel.recipeId(id);

  if (!recipe) return { message: NOT_FOUND, error: 404 };

  return recipe;
};

const updateRecipeId = async (obj) => {
  const recipe = await recipeModel.updateRecipeId(obj);

  if (!recipe) return { message: NOT_FOUND, error: 404 };

  return recipe;
};

module.exports = {
  addRecipe,
  allRecipes,
  recipeId,
  updateRecipeId,
};