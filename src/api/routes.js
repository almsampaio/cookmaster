const { createUser } = require('../controllers/CreateUser');
const { login } = require('../controllers/Login');
const { createRecipes } = require('../controllers/CreateRecipes');
const { allRecipes } = require('../controllers/Recipes');
const { recipById } = require('../controllers/recipesByID');

module.exports = {
  createUser,
  login,
  createRecipes,
  allRecipes,
  recipById,
};
