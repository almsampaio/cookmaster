const { createUser, login, admin } = require('../Controllers/users');
const {
  createRecipe,
  getAll,
  getById,
  update,
  remove,
  addImage,
} = require('../Controllers/recipes');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAll,
  getById,
  update,
  remove,
  addImage,
  admin,
};
