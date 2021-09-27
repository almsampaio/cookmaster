const editRecipeService = require('./editRecipeService');

const { ok } = require('../../utils/httpStatus');

const editRecipeController = async (request, response) => {
  const { id: recipeId } = request.params;
  const { recipe: oldRecipe } = request;

  const { name, ingredients, preparation } = request.body;

  const newRecipe = Object.assign(oldRecipe, { name, ingredients, preparation });
  
  await editRecipeService(newRecipe, recipeId);

  response.status(ok).json(newRecipe);
};

module.exports = editRecipeController;
