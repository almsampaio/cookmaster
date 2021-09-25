// importar models
const { createRecipeM } = require('../models/recipesModel');

const serviceCreateRecipe = async (recipeData) => {
  const createdRecipe = await createRecipeM(recipeData);
  return createdRecipe;
};

module.exports = {
  serviceCreateRecipe,
};