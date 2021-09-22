const RecipeModel = require('../models/RecipeModel');
const RecipeSchema = require('../schemas/RecipeSchema');

const create = async (recipe, userId) => {
  const { error } = RecipeSchema.RecipeCreateValidate(recipe);

  if (error) return { message: 'Invalid entries. Try again.', code: 400 };
  
  const recipeCreated = await RecipeModel.create(recipe, userId);

  return recipeCreated;
};

module.exports = {
  create,
};