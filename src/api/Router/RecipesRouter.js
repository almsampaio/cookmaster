const express = require('express');

const recipesController = require('../../MSC/receitas/recipesController');

const { controlPostRecipe, controlGetRecipes, controlGetRecipeById } = recipesController;

const TokenValidator = require('../../middlewares/TokenValidator');

const router = express.Router();

router.get('/', controlGetRecipes);
router.get('/:id', controlGetRecipeById);
router.post('/', TokenValidator, controlPostRecipe);

module.exports = router;
