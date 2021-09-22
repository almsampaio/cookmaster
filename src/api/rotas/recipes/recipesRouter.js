const { Router } = require('express');

const {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
} = require('../../middlewares/validations/recipes/validates');

const {
  createController,
  readAllController,
  readByIdController,
} = require('../../controllers/recipes/recipesController');

const router = Router();

router.post(
  '/',
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  createController,
);

router.get(
  '/',
  readAllController,
);

router.get(
  '/:id',
  readByIdController,
);

module.exports = router;