const recipesModel = require('../models/recipesModel');
const recipeValidations = require('../validations/recipeValidations');

const addRecipe = async (token, { name, ingredients, preparation }) => {
  recipeValidations.validateName(name);
  recipeValidations.validateIngredients(ingredients);
  recipeValidations.validatePreparation(preparation);
  const decoded = recipeValidations.validateToken(token);
  const result = await recipesModel.addRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, result };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return { status: 200, allRecipes };
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);
  console.log(recipe);
  recipeValidations.recipeExists(recipe);
  return { status: 200, recipe };
};

module.exports = { addRecipe, getAllRecipes, getRecipeById };
