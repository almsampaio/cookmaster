const { Router } = require('express');

const router = Router();

const validateJWT = require('../auth/validateJWT');

const {
  getAllRecipes,
  addRecipes,
} = require('../Controllers/recipesController');

router.get('/', getAllRecipes);
router.post('/', validateJWT, addRecipes);

module.exports = router;