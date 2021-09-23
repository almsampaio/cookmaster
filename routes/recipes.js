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

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getById);

router.put('/:id',
  validations.validateAuth,
  recipesController.update);

module.exports = router;