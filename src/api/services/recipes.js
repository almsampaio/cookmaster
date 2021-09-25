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

const uptadeRecipesById = async ({ name, ingredients, preparation }, id, token) => {
  const validateInsertedBodyError = await validations
    .validateBodyUpdateRecipes({ name, ingredients, preparation });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  const validateToken = await validations
    .validateTokenToUpdateRecipes(token);
  if (validateToken.error) return validateToken;

  const uptadeRecipes = await recipesModels
    .uptadeRecipesById({ name, ingredients, preparation }, id, validateToken.userId);
  return uptadeRecipes;
};

const deleteRecipes = async (id, token) => {
  const validateToken = await validations
    .validateTokenToDeleteRecipes(token);
  if (validateToken.error) return validateToken;

  const DeleteRecipes = await recipesModels
    .deleteRecipes(id, validateToken.userId);

  return DeleteRecipes;
};

const uptadeRecipesWithImage = async (id, path) => recipesModels.uptadeRecipesWithImage(id, path);

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  uptadeRecipesById,
  deleteRecipes,
  uptadeRecipesWithImage,
};
