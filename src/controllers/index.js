const login = require('./login');
const createUser = require('./createUser');
const recipesRegister = require('./recipesRegister');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const editRecipes = require('./editRecipes');
const deleteRecipe = require('./deleteRecipe');

module.exports = {
  login,
  createUser,
  recipesRegister,
  getRecipes,
  getRecipeById,
  editRecipes,
  deleteRecipe,
};