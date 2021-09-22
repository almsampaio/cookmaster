const { Router } = require('express');

const {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  validateUserOrAdminToken,
} = require('../../middlewares/validations/recipes/validates');

const {
  createController,
  readAllController,
  readByIdController,
  updateController,
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

router.put(
  '/:id',
  validateUserOrAdminToken,
  updateController,
);

module.exports = router;