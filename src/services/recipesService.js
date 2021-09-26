const recipesModel = require('../models/recipesModel');
const recipeValidations = require('../validations/recipeValidations');

const addRecipe = async (token, { name, ingredients, preparation }) => {
  recipeValidations.validateName(name);
  recipeValidations.validateIngredients(ingredients);
  recipeValidations.validatePreparation(preparation);
  const decoded = recipeValidations.validateToken(token);
  console.log(decoded);
  const result = await recipesModel.addRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, result };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return { status: 200, allRecipes };
};

module.exports = { addRecipe, getAllRecipes };
