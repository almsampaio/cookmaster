const express = require('express');
const rescue = require('express-rescue');
const { recipesControllers } = require('../controllers');
const { middlewaresRecipes } = require('../utils');

const router = express.Router();

router.post('/recipes', middlewaresRecipes.fieldsRecipes, rescue(recipesControllers.create));
router.get('/recipes', rescue(recipesControllers.getAll));

module.exports = router;
