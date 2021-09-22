const express = require('express');
const recipeController = require('../controllers/recipesController');
const authorization = require('../auth/verifyToken');

const router = express.Router();

router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authorization.verifyAuthorization, recipeController.updateRecipeById);
router.get('/', recipeController.getAllRecipes);
router.post('/', authorization.verifyAuthorization, recipeController.insertRecipe);
// router.delete('/:id', null);

module.exports = router;
