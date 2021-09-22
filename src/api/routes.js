const { createUser, login } = require('../Controllers/users');
const { createRecipe, getAll, getById } = require('../Controllers/recipes');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAll,
  getById,
};
