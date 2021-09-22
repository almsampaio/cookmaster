const { Router } = require('express');

const router = Router();

const validateJWT = require('../auth/validateJWT');

const {
  getAllRecipes,
  getRecipeById,
  addRecipes,
} = require('../Controllers/recipesController');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', validateJWT, addRecipes);

module.exports = router;