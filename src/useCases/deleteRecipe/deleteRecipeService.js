const deleteRecipeModel = require('./deleteRecipeModel');

const deleteRecipeService = async (recipeId) => {
  await deleteRecipeModel(recipeId);
};

module.exports = deleteRecipeService;
