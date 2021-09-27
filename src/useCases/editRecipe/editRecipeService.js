const editRecipeModel = require('./editRecipeModel');

const editRecipeService = async (recipe, recipeId) => {
  await editRecipeModel(recipe, recipeId);
};

module.exports = editRecipeService;
