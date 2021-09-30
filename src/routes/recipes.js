const router = require('express').Router();

const { Recipes } = require('../controllers');
const { authMiddleware, validateRecipe } = require('../middlewares');

router
  .post('/', authMiddleware, validateRecipe, Recipes.create);

module.exports = router;