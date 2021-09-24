const express = require('express');

const router = express.Router();

const {
  addRecipe,
  getRecipes,
} = require('../controllers/recipes');

router.post('/', addRecipe);

router.get('/', getRecipes);

module.exports = router;
