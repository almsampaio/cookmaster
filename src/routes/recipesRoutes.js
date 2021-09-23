const express = require('express');

const router = express.Router();

const {
  addRecipe,
} = require('../controllers/recipes');

router.post('/', addRecipe);

module.exports = router;
