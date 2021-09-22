const { Router } = require('express');

const router = Router();

const validateJWT = require('../auth/validateJWT');

const {
  addRecipes,
} = require('../Controllers/recipesController');

router.post('/', validateJWT, addRecipes);

module.exports = router;