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

const getAllRecipes = async (_token) => recipesModels.getAllRecipes();
  
  // const validateToken = await validations
  //   .validateTokenToCreateRecipes(token);
  // if (validateToken.error) return validateToken;

module.exports = {
  createRecipes,
  getAllRecipes,
};
