const { createUser } = require('../controllers/CreateUser');
const { login } = require('../controllers/Login');
const { createRecipes } = require('../controllers/CreateRecipes');

module.exports = {
  createUser,
  login,
  createRecipes,
};
