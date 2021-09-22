const { createUser, login } = require('../controllers/usersController');
const { createRecipe } = require('../controllers/recipesController');

const authMiddleware = require('../middlewares/authMiddleware');

module.exports = {
  createUser,
  login,
  authMiddleware,
  createRecipe,
};
