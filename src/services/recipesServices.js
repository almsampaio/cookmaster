const recipesModel = require('../model/recipesModel');

const createRecipe = async (name, ingredients, preparation) => {
  const recipe = await recipesModel.createRecipe(name, ingredients, preparation);
  return recipe;
};

module.exports = {
  createRecipe,
};
