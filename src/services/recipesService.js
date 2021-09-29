const recipesModels = require('../models/recipesModels');
const recipesValidations = require('./validations/recipesValidations');

const addRecipes = async (name, ingredients, preparation, token) => {
  recipesValidations.validateRequire(name, ingredients, preparation);
  const tokenValidate = recipesValidations.validateToken(token);
  const response = await recipesModels.addRecipes(
    name, ingredients, preparation, tokenValidate.data,
  );
  return { status: 201, response };
};

const getRecipes = async () => {
  const response = await recipesModels.getRecipes();
  return { status: 200, response };
};

module.exports = {
  addRecipes,
  getRecipes,
};
