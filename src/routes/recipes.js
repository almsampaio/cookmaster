const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/ctrlRecipes');
const upload = require('../controller/multer');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(controller.creatRecipe));

recipesRouter.get('/:id', rescue(controller.getRecipeById));
recipesRouter.get('/', rescue(controller.getOne));

recipesRouter.put('/:id/image', upload.single('image'), rescue(controller.addImage));
recipesRouter.put('/:id', rescue(controller.edit));

recipesRouter.delete('/:id', rescue(controller.deleteR));

module.exports = recipesRouter;
