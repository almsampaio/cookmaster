const RecipeModel = require('../models/RecipeModel');
const RecipeSchema = require('../schemas/RecipeSchema');

const getById = async (id) => {
  const recipe = await RecipeModel.getById(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return recipe;
};

const getAll = async () => {
  const recipes = await RecipeModel.getAll();

  return recipes;
};

const create = async (recipe, userId) => {
  const { error } = RecipeSchema.RecipeCreateValidate(recipe);

  if (error) return { message: 'Invalid entries. Try again.', code: 400 };
  
  const recipeCreated = await RecipeModel.create(recipe, userId);

  return recipeCreated;
};

module.exports = {
  create,
  getAll,
  getById,
};