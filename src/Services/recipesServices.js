const recipesModel = require('../Model/recipesModel');

const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };

const createRecipe = async (userId, name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return invalidEntries;
  const create = await recipesModel.createRecipe(userId, name, ingredients, preparation);
  return ({ status: 201, recipe: create });
};

const getAllRecipe = async () => {
  const recipes = await recipesModel.getAllRecipe();
  return ({ status: 200, recipes });
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
};
