const express = require('express');
const recipeController = require('../controllers/recipesController');
const authorization = require('../auth/verifyToken');

const router = express.Router();

router.get('/:id', recipeController.getRecipeById);
router.get('/', recipeController.getAllRecipes);
// router.put('/:id', null);
router.post('/', authorization.verifyAuthorization, recipeController.insertRecipe);
// router.delete('/:id', null);

module.exports = router;
