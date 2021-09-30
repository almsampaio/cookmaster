const express = require('express');
const { validateEntries } = require('../middlewares/recipesValidations');
const Recipes = require('../controllers/Recipes');

const router = express.Router();

router.post('/', validateEntries, Recipes.create);

module.exports = router;