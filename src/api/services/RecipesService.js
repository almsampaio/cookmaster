const recipeModel = require('../models/RecipeModel');

const createRecipe = async (recipeData, userId) => {
  const { name, ingredients, preparation } = recipeData;

  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }

  const recipe = await recipeModel.createRecipe(recipeData, userId);

  return { status: 201, recipe };
};

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await recipeModel.getById(id);
  return result;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
