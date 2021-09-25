const express = require('express');

const router = express.Router();

// importar controllers
const { createRecipe, listRecipes,
  recipeDetails, editRecipe } = require('../controllers/recipesControllers');
// importar middlewares de validação
const { verifyToken, verifyFields,
  checksPermissions } = require('../middlewares/recipesMiddlewares');

router.post('/', verifyFields, verifyToken, createRecipe);
router.get('/', listRecipes);
router.get('/:id', recipeDetails);
router.put('/:id', verifyToken, checksPermissions, editRecipe);
module.exports = router;