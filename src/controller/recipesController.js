const recipesService = require('../service/recipesService');
const validateJWT = require('./jwtValidation');
const uploadImage = require('./multer');

const postRecipe = [ 
  validateJWT,
  async (req, res, next) => {
    try {
      const newRecipe = req.body;
      const { _id: userId } = await req.user;
      const recipe = await recipesService.createRecipe(newRecipe, userId);
      return res.status(201).json({ recipe });
    } catch (err) {
      return next(err);
    }
  },
];

const getRecipes = async (_req, res, next) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    if (recipes) return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await recipesService.getById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return next(err);
  }
};

const putRecipe = [
  validateJWT,
  async (req, res, next) => {
    const { id } = req.params;
    const recipe = req.body;
    try {
      const updatedRecipe = await recipesService.recipeUpdate(id, recipe);
      if (updatedRecipe) return res.status(200).json(updatedRecipe);
    } catch (err) {
      return next(err);
    }
  },
];

const deleteRecipe = [
  validateJWT,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedRecipe = await recipesService.deleteById(id);
      return res.status(204).json(deletedRecipe);
    } catch (err) {
      return next(err);
    }
  },
];

const uploadRecipeImage = [
  validateJWT,
  uploadImage.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = await recipesService.addImage(id);
      return res.status(200).json(updated);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  postRecipe,
  getRecipes,
  getRecipeById,
  putRecipe,
  deleteRecipe,
  uploadRecipeImage,
}; 