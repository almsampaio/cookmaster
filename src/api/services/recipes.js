// const recipesModels = require('../models/recipes');
const validations = require('./validations');

const createRecipes = async ({ name, ingredients, preparation }) => {
  const validateInsertedBodyError = validations
    .validateBodyCreateRecipes({ name, ingredients, preparation });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  // const validateSingleUserEmailError = await validations
  //   .validateSingleUserEmail(email);
  // if (validateSingleUserEmailError) return validateSingleUserEmailError;

  // return RecipesModels.createRecipes({ name, email, password });
};

module.exports = {
  createRecipes,
};
