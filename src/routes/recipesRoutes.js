const express = require('express');

const router = express.Router();

// importar controllers
const { createRecipe, listRecipes,
  recipeDetails, editRecipe,
  deleteRecipe } = require('../controllers/recipesControllers');
// importar middlewares de validação
const { verifyToken, verifyFields,
  checksPermissions } = require('../middlewares/recipesMiddlewares');

router.post('/', verifyFields, verifyToken, createRecipe);
router.get('/', listRecipes);
router.get('/:id', recipeDetails);
router.put('/:id', verifyToken, checksPermissions, editRecipe);
router.delete('/:id', verifyToken, checksPermissions, deleteRecipe);
module.exports = router;