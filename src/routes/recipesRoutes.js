const express = require('express');

const router = express.Router();

// importar controllers
const { createRecipe, listRecipes, recipeDetails } = require('../controllers/recipesControllers');
// importar middlewares de validação
const { verifyToken, verifyFields } = require('../middlewares/recipesMiddlewares');

router.post('/', verifyFields, verifyToken, createRecipe);
router.get('/', listRecipes);
router.get('/:id', recipeDetails);
module.exports = router;