const express = require('express');
const recipeController = require('../controllers/recipesController');
const authorization = require('../auth/verifyToken');

const router = express.Router();

// router.get('/', null);
// router.get('/:id', null);
router.post('/', authorization.verifyAuthorization, recipeController.insertRecipe);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;
