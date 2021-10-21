const express = require('express');
const verifyToken = require('../auth/verifyToken');
const { createRecipe, getAllRecipes, getRecipeById } = require('../controllers/recipesControllers');

const router = express.Router();

router.post('/', verifyToken, createRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

module.exports = router;
