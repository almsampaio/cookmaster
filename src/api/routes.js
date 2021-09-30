const { createUser } = require('../controllers/CreateUser');
const { login } = require('../controllers/Login');
const { createRecipes } = require('../controllers/CreateRecipes');
const { allRecipes } = require('../controllers/Recipes');

module.exports = {
  createUser,
  login,
  createRecipes,
  allRecipes,
};
