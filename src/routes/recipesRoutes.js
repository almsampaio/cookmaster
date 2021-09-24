const express = require('express');

const router = express.Router();

const {
  addRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
} = require('../controllers/recipes');

router.post('/', addRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipe);

router.put('/:id', updateRecipe);

module.exports = router;
