// importar models
const { createRecipeM, getAllRecipesM } = require('../models/recipesModel');

const serviceCreateRecipe = async (recipeData) => {
  const createdRecipe = await createRecipeM(recipeData);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const recipes = await getAllRecipesM();
  return recipes;
};

module.exports = {
  serviceCreateRecipe,
  getAllRecipes,
};