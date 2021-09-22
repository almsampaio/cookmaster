const recipeModel = require('../models/recipesModel');

const verify = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      code: 400,
      message: 'Invalid entries. Try again.',
    };
  }
  return {};
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const recipe = {
    name,
    ingredients,
    preparation,
    userId: 'userId',
  };
  const verifica = verify(name, ingredients, preparation);
  if (verifica.message) return verifica;
  const create = await recipeModel.createRecipe(recipe);
  return create;
};

module.exports = { createRecipe };
