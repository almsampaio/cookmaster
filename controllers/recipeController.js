const {
  StatusCodes: { CREATED, OK },
} = require('http-status-codes');
const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const recipe = await recipeService.createNewRecipe(req.body, userId);
  res.status(CREATED).json({ recipe });
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(OK).json(recipes);
  } catch (e) {
    next(e);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    res.status(OK).json(recipe);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
