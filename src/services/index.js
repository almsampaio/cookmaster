const createUser = require('./createUser');
const login = require('./login');
const recipesRegister = require('./recipesRegister');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const editRecipes = require('./editRecipes');
const deleteRecipe = require('./deleteRecipe');
const addRecipeImage = require('./addRecipeImage');

module.exports = {
  createUser,
  login,
  recipesRegister,
  getRecipes,
  getRecipeById,
  editRecipes,
  deleteRecipe,
  addRecipeImage,
};