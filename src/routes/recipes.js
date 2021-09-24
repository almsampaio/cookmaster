const express = require('express');
const rescue = require('express-rescue');
const { recipesControllers } = require('../controllers');
const { middlewaresRecipes } = require('../utils');

const router = express.Router();

router.post('/recipes', middlewaresRecipes.fieldsRecipes, rescue(recipesControllers.create));

module.exports = router;
