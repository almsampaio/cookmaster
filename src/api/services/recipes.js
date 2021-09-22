const recipesModels = require('../models/recipes');
const validations = require('./validations');

const createRecipes = async ({ name, ingredients, preparation }, token) => {
  const validateInsertedBodyError = validations
    .validateBodyCreateRecipes({ name, ingredients, preparation });
  if (validateInsertedBodyError) return validateInsertedBodyError;
   
  const validateToken = await validations
    .validateTokenToCreateRecipes(token);
  if (validateToken.error) return validateToken;

  return recipesModels.createRecipes({ name, ingredients, preparation }, validateToken.payload);
};

const getAllRecipes = async () => recipesModels.getAllRecipes();
  
const getRecipesById = async (id) => {
  const recipeById = await recipesModels.getRecipesById(id);
  const validateRecipeExists = await validations
    .validateRecipeExists(id, recipeById);
  
  if (validateRecipeExists) return validateRecipeExists;
   
  return recipeById;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
};
