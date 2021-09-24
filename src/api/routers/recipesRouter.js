const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controllers = require('../controllers');

router.post('/', rescue(controllers.recipesController.createRecipe));
router.get('/', rescue(controllers.recipesController.getAllRecipes));
router.get('/:id', rescue(controllers.recipesController.getRecipeById));
router.put('/:id', rescue(controllers.recipesController.updateRecipe));

module.exports = router;