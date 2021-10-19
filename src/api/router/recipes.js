const { Router } = require('express');

const {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  validateUserOrAdminToken,
} = require('../middlewares/validateRecipes');

const {
  upload,
} = require('../middlewares/multer');

const {
  createController,
  readAllController,
  readByIdController,
  updateController,
  updateImageController,
  deleteController,
} = require('../controller/recipes');

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

router.put(
  '/:id/image/',
  validateUserOrAdminToken,
  upload.single('image'),
  updateImageController,
);

router.delete('/:id', validateUserOrAdminToken, deleteController);

module.exports = router;