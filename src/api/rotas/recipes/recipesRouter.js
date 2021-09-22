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
  deleteController,
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

router.delete('/:id', validateUserOrAdminToken, deleteController);

module.exports = router;