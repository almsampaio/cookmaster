const { Router } = require('express');
const recipeController = require('../controllers/recipeController');
const { recipeValidation, checkIfProductIdExists } = require('../middlewares/recipe');
const { authentication } = require('../middlewares/auth');

const router = Router();
router.post('/', recipeValidation, authentication, recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:id', checkIfProductIdExists, recipeController.getRecipeById);

module.exports = router;