const express = require('express');
const rescue = require('express-rescue');
const { recipesControllers } = require('../controllers');
const { middlewaresRecipes } = require('../utils');
const { imageUpload } = require('../middlewares');

const router = express.Router();

router.post('/recipes', middlewaresRecipes.fieldsRecipes, rescue(recipesControllers.create));
router.get('/recipes', rescue(recipesControllers.getAll));
router.get('/recipes/:id', middlewaresRecipes.recipeNotExist, rescue(recipesControllers.getOne));
router.put('/recipes/:id', middlewaresRecipes.checkEdit, rescue(recipesControllers.update));
router.delete('/recipes/:id', middlewaresRecipes.checkEdit, rescue(recipesControllers.exclude));
router.put('/recipes/:id/image', middlewaresRecipes.checkEdit, imageUpload(),
  rescue(recipesControllers.putWithImage));

module.exports = router;
