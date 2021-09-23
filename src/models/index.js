const getByEmail = require('./getByEmail');
const createUser = require('./createUser');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const editRecipes = require('./editRecipes');
const deleteRecipe = require('./deleteRecipe');

module.exports = {
  createUser,
  getByEmail,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipes,
  deleteRecipe,
 };