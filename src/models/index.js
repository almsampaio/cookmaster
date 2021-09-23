const getByEmail = require('./getByEmail');
const createUser = require('./createUser');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const editRecipes = require('./editRecipes');
const deleteRecipe = require('./deleteRecipe');
const addRecipeImage = require('./addRecipeImage');
const createAdmin = require('./createAdmin');

module.exports = {
  createUser,
  getByEmail,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipes,
  deleteRecipe,
  addRecipeImage,
  createAdmin,
 };