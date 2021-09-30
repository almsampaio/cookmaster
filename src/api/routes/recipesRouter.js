const { Router } = require('express');

const route = Router();

const recipesController = require('../controllers/recipesController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const validateNewRecipe = require('../middlewares/validateNewRecipe');

route.post('/', validateNewRecipe, authMiddleware, recipesController.createRecipe);
route.get('/', recipesController.getRecipes);
route.get('/:id', recipesController.getById);
route.put('/:id', authMiddleware, recipesController.editRecipe);
route.delete('/:id', authMiddleware, recipesController.vaporizeRecipe);
route.put('/:id/image', authMiddleware, recipesController.putImage);

module.exports = route;