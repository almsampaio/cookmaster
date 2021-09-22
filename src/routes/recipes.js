const express = require('express');
const path = require('path');

const recipesRouter = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/imgUpload');
const { validateRecipe, validateIfUserIsAuth } = require('../middlewares/recipes');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updatedRecipe,
  deleteRecipe,
  addImage,
} = require('../controllers/recipes');

recipesRouter.use(express.static(path.join(__dirname, '..', 'uploads')));

recipesRouter.post('/', auth, validateRecipe, createRecipe);
recipesRouter.get('/', validateIfUserIsAuth, getAllRecipes);
recipesRouter.get('/:id', getRecipeById);
recipesRouter.put('/:id', auth, updatedRecipe);
recipesRouter.delete('/:id', auth, deleteRecipe);
recipesRouter.put('/:id/image', auth, upload.single('image'), addImage);

module.exports = recipesRouter;