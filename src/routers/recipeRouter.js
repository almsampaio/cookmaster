const { Router } = require('express');

const router = Router();

const { validateJWT } = require('../auth/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post('/', validateJWT, recipeController.addRecipe);

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getById);

router.put('/:id', validateJWT, recipeController.updateRecipe);

router.delete('/:id', validateJWT, recipeController.deleteRecipe);

router.put(
  '/:id/image',
  validateJWT,
  recipeController.upload.single('image'),
  recipeController.uploadImage,
);

module.exports = router;