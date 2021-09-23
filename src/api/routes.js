const { createUser, login } = require('../controllers/usersController');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeImage,
  removeRecipe } = require('../controllers/recipesController');

const authMiddleware = require('../middlewares/authMiddleware');

module.exports = {
  createUser,
  login,
  authMiddleware,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeImage,
  removeRecipe,
};
