const recipeModel = require('../models/recipeModel');
const recipeValidations = require('../validations/recipeValidations');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validations = await recipeValidations.validateEntries(name, ingredients, preparation);
  if (validations.message) return validations;

  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return { recipe };
};

const listRecipes = async () => {
  const list = await recipeModel.listRecipes();
  return list;
};

const recipeId = async (id) => {
  const validations = await recipeValidations.validateRecipe(id);
  if (validations.message) return validations;

  const recipe = await recipeModel.recipeId(id);
  return { recipe };
};

module.exports = {
  createRecipe,
  listRecipes,
  recipeId,
};