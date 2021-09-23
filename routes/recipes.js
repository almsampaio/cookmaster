const express = require('express');
const validations = require('../middlewares/validations');
const recipesValidations = require('../middlewares/recipesValidations');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/',
  validations.validateName,
  recipesValidations.validateIngredients,
  recipesValidations.validatePreparation,
  validations.validateAuth,
  recipesController.create);

module.exports = router;