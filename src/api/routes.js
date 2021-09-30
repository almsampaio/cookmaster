const { createUser } = require('../controllers/CreateUser');
const { login } = require('../controllers/Login');
const { createRecipes } = require('../controllers/CreateRecipes');
const { allRecipes } = require('../controllers/Recipes');
const { recipById } = require('../controllers/RecipesByID');
const { updateRecipe } = require('../controllers/UpdateRecipe');
const { removeRecipe } = require('../controllers/RemoveRecipe');
const { addImage } = require('../controllers/AddImage');

module.exports = {
  createUser,
  login,
  createRecipes,
  allRecipes,
  recipById,
  updateRecipe,
  removeRecipe,
  addImage,
};
