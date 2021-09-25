// importar models
const { createRecipeM,
  getAllRecipesM,
  findRecipeByIdM } = require('../models/recipesModel');

const serviceCreateRecipe = async (recipeData) => {
  const createdRecipe = await createRecipeM(recipeData);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const recipes = await getAllRecipesM();
  return recipes;
};

const findRecipeById = async (id) => {
  const recipe = await findRecipeByIdM(id);
  return recipe;
};

module.exports = {
  serviceCreateRecipe,
  getAllRecipes,
  findRecipeById,
};