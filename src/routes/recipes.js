const express = require('express');
const controller = require('../controller/recipesController');

const router = express.Router();

router.get('/:id', controller.getRecipeById);
router.put('/:id', controller.putRecipe);
router.delete('/:id', controller.deleteRecipe);
router.put('/:id/image/', controller.uploadRecipeImage);
router.post('/', controller.postRecipe);
router.get('/', controller.getRecipes);

module.exports = router; 