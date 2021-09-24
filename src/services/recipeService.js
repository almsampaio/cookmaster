const recipeModel = require('../models/recipeModel');

const create = async (recipe) => {
  const { name = '', ingredients = '', preparation = '' } = recipe;
  
  if (!name || !ingredients || !preparation) return {
    code: 400,
    message: 'Invalid entries. Try again.'
  }

  const createdRecipe = await recipeModel.create(recipe);
  return { createdRecipe };
}

module.exports = {
  create,
}
