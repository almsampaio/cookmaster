const { createUser, login } = require('../Controllers/users');
const { createRecipe } = require('../Controllers/recipes');

module.exports = {
  createUser,
  login,
  createRecipe,
};
