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

const getRecipesId = async (id) => {
  const response = await recipesModels.getRecipesId(id);
  await recipesValidations.validateRecipes(response);
  return { status: 200, response };
};

const editRecipesId = async (id, { name, ingredients, preparation }, token) => {
  recipesValidations.validateTokenExist(token);
  recipesValidations.validateToken(token);
  const response = await recipesModels.editRecipesId(id, name, ingredients, preparation);
  console.log('response', response);
  return { status: 200, response };
};

const deleteRecipesId = async (id, token) => {
  recipesValidations.validateTokenExist(token);
  await recipesModels.deleteRecipesId(id);
  return { status: 204 };
};

module.exports = {
  addRecipes,
  getRecipes,
  getRecipesId,
  editRecipesId,
  deleteRecipesId,
};
