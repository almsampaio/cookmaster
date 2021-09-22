const { Router } = require('express');

const router = Router();

const { validateJWT } = require('../auth/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post('/', validateJWT, recipeController.addRecipe);

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getById);

module.exports = router;