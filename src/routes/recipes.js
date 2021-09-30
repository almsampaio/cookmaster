const router = require('express').Router();

const { Recipes } = require('../controllers');
const { authMiddleware, validateRecipe, upload } = require('../middlewares');

router
  .post('/', authMiddleware, validateRecipe, Recipes.create)
  .put('/:id/image', authMiddleware, upload.single('image'), Recipes.updateImage)
  .put('/:id', authMiddleware, Recipes.update)
  .delete('/:id', authMiddleware, Recipes.exclude)
  .get('/:id', Recipes.getById)
  .get('/', Recipes.getAll);

module.exports = router;