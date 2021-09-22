const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
        err: { message: 'Invalid entries. Try again.', status: 400 } };
  }
  const recipe = await recipesModel.insertRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  createRecipe,
};
