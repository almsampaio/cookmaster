const recipeModel = require('../models/recipeModel');

async function addRecipe({ name, ingredients, preparation, userId }) {
  if (!name || !ingredients || !preparation) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }

  const addedRecipe = await recipeModel.addRecipe({ name, ingredients, preparation, userId });
  return { code: 201, recipe: addedRecipe };
}

module.exports = {
  addRecipe,
};