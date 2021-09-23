const express = require('express');

const recipeController = require('../controllers/recipesController');
const authorization = require('../auth/verifyToken');

const router = express.Router();

const { upload } = require('../utils/upload');

router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authorization.verifyAuthorization, recipeController.updateRecipeById);
router.delete('/:id', authorization.verifyAuthorization, recipeController.deleteRecipeById);
router.get('/', recipeController.getAllRecipes);
router.post('/', authorization.verifyAuthorization, recipeController.insertRecipe);

router.put('/:id/image', 
  authorization.verifyAuthorization, 
  upload.single('image'),
  recipeController.updateRecipeImageById);

module.exports = router;
