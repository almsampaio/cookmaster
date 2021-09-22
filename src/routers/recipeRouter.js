const { Router } = require('express');

const router = Router();

const { validateJWT } = require('../auth/authMiddleware');
const recipeController = require('../controllers/recipeController');

router.post('/', validateJWT, recipeController.addRecipe);

router.get('/', recipeController.getAll);

module.exports = router;