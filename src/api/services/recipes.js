// const recipesModels = require('../models/recipes');
const validations = require('./validations');

const createRecipes = async ({ name, ingredients, preparation }, token) => {
  const validateInsertedBodyError = validations
    .validateBodyCreateRecipes({ name, ingredients, preparation });
  if (validateInsertedBodyError) return validateInsertedBodyError;
   
  const validateToken = validations
    .validateTokenToCreateRecipes(token);
  if (validateToken) return validateToken;
};

module.exports = {
  createRecipes,
};
