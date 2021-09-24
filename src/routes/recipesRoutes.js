const express = require('express');

const router = express.Router();

const {
  addRecipe,
  getRecipes,
  getRecipe,
} = require('../controllers/recipes');

router.post('/', addRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipe);

module.exports = router;
