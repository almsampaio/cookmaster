const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');
const upload = require('../controllers/multer');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));
recipesRouter.get('/', rescue(recipesController.getRecipes));
recipesRouter.get('/:id', rescue(recipesController.getRecipesId));
recipesRouter.put('/:id', rescue(recipesController.editRecipesId));
recipesRouter.delete('/:id', rescue(recipesController.deleteRecipesId));

recipesRouter.put(
  '/:id/image', 
  upload.single('image'), 
  rescue(recipesController.addRecipesImageId),
);

module.exports = recipesRouter;
