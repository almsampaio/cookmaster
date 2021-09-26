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

module.exports = { addRecipe };
