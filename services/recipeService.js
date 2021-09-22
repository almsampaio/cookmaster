const recipeModel = require('../models/recipeModel');

const createNewRecipe = async (recipe, id) => {
  const result = await recipeModel.createRecipe(recipe, id);
  return result;
};

module.exports = { 
  createNewRecipe,
};