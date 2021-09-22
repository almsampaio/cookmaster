const express = require('express');

const router = express.Router();

const { validateJWT, validateRecipeForm } = require('../middlewares');
const recipeController = require('../controllers/recipeController');

router.post('/', [
  validateRecipeForm,
  validateJWT,
  recipeController.create,
]);

router.put('/:id', [
  validateRecipeForm,
  validateJWT,
  recipeController.update,
]);

router.get('/:id', recipeController.getById);

router.get('/', recipeController.getAll);

router.use((err, _req, res, _next) => {
  if (err.missingToken) return res.status(401).json({ message: 'missing auth token' });

  if (err.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(401).json({ message: 'jwt malformed' });
}); 

module.exports = router;