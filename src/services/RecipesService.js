const RecipesModel = require('../models/RecipesModel');

const createRecipe = async (recipeData) => {
  const recipe = RecipesModel.createRecipe(recipeData);

  return recipe;
};

module.exports = { createRecipe };
