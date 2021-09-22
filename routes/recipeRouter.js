const { Router } = require('express');
const recipeController = require('../controllers/recipeController');
const recipeValidation = require('../middlewares/recipe');
const { authentication } = require('../middlewares/auth');

const router = Router();
router.post('/', recipeValidation, authentication, recipeController.createRecipe);

module.exports = router;