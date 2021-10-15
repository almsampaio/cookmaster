const rescue = require('express-rescue');
const recipesController = require('../controllers/Recipes');
const token = require('../utils/token');

const recipes = (app) => {
  app.route('/recipes')
    .post(rescue(token.validateToken), rescue(recipesController.createRecipe))
    .get(rescue(recipesController.getAll));

  app.route('/recipes/:id')
    .get(rescue(recipesController.getById))
    .put(rescue(token.validateToken), rescue(recipesController.updateRecipe));
};

module.exports = recipes;
